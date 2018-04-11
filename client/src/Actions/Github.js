import rp from 'request-promise';
import xhr from 'xhr';
import conf from '../conf';

export const setGihub = (data) => {
    return {
        type: 'FETCH_GITHUB',
        githubData: data
    };
}
export const setError = (error) => {
    return {
        type: 'FETCH_ERROR',
        error: error,
    };
}

export const fetchGithub = () => {
    return (dispatch) => {
        xhr({
            url: `${conf.apibaseurl}listGithub`
        }, (err, resp, body) => {
            var langs = JSON.parse(body);
            var sum = 0;
            langs.resultados.forEach(langu => {
                sum += langu.percentage;
            });
            var x = [];
            var y = [];
            langs.resultados.forEach(langu => {
                if ((langu.percentage/sum) > 0.01) {
                    x.push(langu.lang);
                    y.push(langu.percentage);
                }
            });
            var data = [{
                type: 'pie',
                labels: x,
                values: y,
            }];
            return dispatch(setGihub(data));
        });
    }
};