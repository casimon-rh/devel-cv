const rp = require('request-promise');
const conf = require('../../conf');
const Stats = require('../models').Stats;
const Source = require('../models').Source;

let transaction = [];
let promises = [];
let langlist = [];

const languagesPromise = (url, socket) =>
    new Promise((resolve, reject) => {
        var urlSplit = url.split('//');
        var authUrl = urlSplit[0] + '//' + `${conf.username}:${conf.token}@` + urlSplit[1];
        rp({
                uri: authUrl,
                json: true,
                headers: {
                    'User-Agent': 'request'
                },
            }).then((body) => {
                socket.emit('progress', `rping ${url}`);
                resolve(body);
            })
            .catch((err) => {
                console.log('err', err);
                reject(err);
            });
    });
const DeleteStatPromise = (statId, socket) => new Promise((resolve, reject) => {
    Stats.findById(statId).then(currentStat => {
        if (currentStat) {
            currentStat.destroy().then(() => {
                socket.emit('progress', `destroying ${statId}`);
                console.log(`destroying ${statId}`);
                resolve()
            }).catch(error => console.log(error.stack));
        }
    })
});
const UpdateStatPromise = (statId, newStat, socket) => new Promise((resolve, reject) => {
    Stats.findById(statId).then(currentStat => {
        if (currentStat) {
            currentStat.update({
                percentage: newStat
            }).then(() => {
                socket.emit('progress', `updating ${statId}`);
                console.log(`updating ${statId}`);
                resolve()
            }).catch(error => console.log(error.stack));;
        }
    })
});
const InsertStatPromise = (newLang, newStat, type, socket) => new Promise((resolve, reject) => {
    Source.findAll({
        where: {
            name: type
        }
    }).then(sources => {
        if (sources) {
            var githubSource = sources[0];
            if (githubSource) {
                Stats.create({
                    lang: newLang,
                    percentage: newStat,
                    sourceId: githubSource.id
                }).then(() => {
                    socket.emit('progress', `inserting ${newLang}`);
                    console.log(`inserting ${newLang}`);
                    resolve()
                }).catch(error => console.log(error.stack));
            }
        }
    });
});

module.exports = {
    syncGithub(socket) {
        rp({
            uri: `https://${conf.username}:${conf.token}@api.github.com/user/repos?affiliation=owner&visibility=all&per_page=100`,
            json: true,
            method: 'GET',
            headers: {
                'User-Agent': 'request'
            }
        }).then((body) => {
            promises = [];
            body.forEach(repo => {
                promises.push((languagesPromise(repo.languages_url, socket)));
            });
            var langs = [];
            Promise.all(promises).then((results) => {
                results.forEach((repolanguages) => {
                    var complete = 0;
                    langlist = [];
                    for (var language in repolanguages) {
                        langlist.push(language);
                        complete += repolanguages[language];
                    }
                    for (var lang in langlist) {
                        if (!lang in langs) {
                            langs[lang] = 0;
                        }
                    }
                    for (var repolanguage in repolanguages) {
                        var anterior = langs[repolanguage];
                        if (anterior === undefined) {
                            anterior = 0;
                        }
                        langs[repolanguage] = anterior + ((repolanguages[repolanguage]));
                    }
                });
                console.log('langs', langs);
                return Stats
                    .findAll({
                        include: [{
                            model: Source
                        }],
                        where: {
                            'sourceId': '1'
                        }
                    }).then((StatsList) => {
                        //transacciones artesanales :c
                        transaction = [];
                        StatsList.forEach(stat => {
                            if (stat.lang in langs) {
                                transaction.push(UpdateStatPromise(stat.id, langs[stat.lang], socket));
                            } else {
                                transaction.push(DeleteStatPromise(stat.id, socket));
                            }
                        });
                        Object.keys(langs).forEach(lang => {
                            if (StatsList.filter(x => x.lang === lang).length === 0) {
                                transaction.push(InsertStatPromise(lang, langs[lang], 'Github', socket));
                            }
                        });
                        Promise.all(transaction).then(() => {
                            return socket.emit('progress', 'END');
                        }).catch((error) => {
                            console.error(error.stack);
                            return socket.emit('error', 'ERROR');
                        });
                    }).catch((error) => {
                        console.error(error.stack);
                        return socket.emit('error', 'ERROR');
                    });
            }).catch((error) => {
                console.error(error.stack);
                return socket.emit('progress', 'END');
            });
        }).catch((error) => {
            console.error(error.stack);
            return socket.emit('error', 'ERROR');
        });;
    },
    listGithub(req, res) {
        return Stats
            .findAll({
                include: [{
                    model: Source,
                }],
                where: {
                    'sourceId': '1'
                }
            }).then((StatsList) => {
                if (!StatsList) {
                    return res.status(404).send({
                        message: "Not found."
                    });
                }
                var resultados = [];
                var sum = 0;
                StatsList.forEach(stat => {
                    resultados.push({
                        lang: stat.lang,
                        percentage: stat.percentage
                    })
                    sum += stat.percentage;
                });
                console.log(sum);
                return res.status(200).send({
                    resultados
                });
            }).catch((error) => {
                console.error(error.stack);
                return res.status(500).send({
                    message: "Unexpected error."
                });
            });
    },
    syncWaka(socket) {
        rp({
            uri: `https://wakatime.com/api/v1/users/${conf.username}/stats/last_7_days?api_key=${conf.key}`,
            json: true,
            method: 'GET',
            headers: {
                'User-Agent': 'request'
            }
        }).then((body) => {
            var langs = [];
            body.data.languages.forEach((wakalanguage) => {
                langs[wakalanguage.name] = wakalanguage.percent;
            });
            console.log('langs', langs);
            return Stats
                .findAll({
                    include: [{
                        model: Source
                    }],
                    where: {
                        'sourceId': '2'
                    }
                }).then((StatsList) => {
                    //transacciones artesanales :c
                    transaction = [];
                    StatsList.forEach(stat => {
                        if (stat.lang in langs) {
                            transaction.push(UpdateStatPromise(stat.id, langs[stat.lang], socket));
                        } else {
                            transaction.push(DeleteStatPromise(stat.id, socket));
                        }
                    });
                    Object.keys(langs).forEach(lang => {
                        if (StatsList.filter(x => x.lang === lang).length === 0) {
                            transaction.push(InsertStatPromise(lang, langs[lang], 'Waka', socket));
                        }
                    });
                    Promise.all(transaction).then(() => {
                        return socket.emit('progress', 'END');
                    }).catch((error) => {
                        console.error(error.stack);
                        return socket.emit('progress', 'END');

                    });
                }).catch((error) => {
                    console.error(error.stack);
                    return socket.emit('progress', 'END');

                });
        }).catch((error) => {
            console.error(error.stack);
            return socket.emit('progress', 'END');

        });;
    },
    listWaka(req, res) {
        return Stats
            .findAll({
                include: [{
                    model: Source,
                }],
                where: {
                    'sourceId': '2'
                }
            }).then((StatsList) => {
                if (!StatsList) {
                    return res.status(404).send({
                        message: "Not found."
                    });
                }
                var resultados = [];
                var sum = 0;
                StatsList.forEach(stat => {
                    resultados.push({
                        lang: stat.lang,
                        percentage: stat.percentage
                    })
                    sum += stat.percentage;
                });
                console.log(sum);
                return res.status(200).send({
                    resultados
                });
            }).catch((error) => {
                console.error(error.stack);
                return res.status(500).send({
                    message: "Unexpected error."
                });
            });
    }
}