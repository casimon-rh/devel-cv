import xhr from 'xhr';
import conf from '../conf';

export const setKnowledge = (data) => {
    return {
        type: 'FETCH_KNOWLEDGE',
        knowledgeData: data
    };
}
export const setError = (error) => {
    return {
        type: 'FETCH_ERROR',
        error: error,
    };
}

export const fetchKnowledge = () => {
    return (dispatch) => {
        xhr({
            url: `${conf.apibaseurl}listKnowledge`
        }, (err, resp, body) => {
            var langs = JSON.parse(body);
            var x = [];
            var y = [];
            var y1 = [];
            langs.resultados.sort((a, b) => {
                if (a.lang < b.lang) return -1;
                if (a.lang > b.lang) return 1;
                return 0;
            }).forEach(langu => {
                if (langu.percentage > 1) {
                    x.push(langu.lang);
                    y.push(langu.percentage);
                    y1.push(langu.percentage + 10);
                }
            });
            var data = [{
                type: 'bar',
                x: x,
                y: y,
                name: 'Percent'
            }, {
                mode: 'text',
                type: 'scatter',
                text: x,
                x: x,
                y: y1,
                name: 'Label',
                textposition: 'bottom center',
                marker: { size: 10 }
            }];
            return dispatch(setKnowledge(data));
        });
    }
};