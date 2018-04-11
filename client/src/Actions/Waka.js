import rp from 'request-promise';
import xhr from 'xhr';
import conf from '../conf';

export const setWaka = (data) => {
    return {
        type: 'FETCH_WAKA',
        wakaData: data
    };
}
export const setError = (error) => {
    return {
        type: 'FETCH_ERROR',
        error: error,
    };
}

export const fetchWaka = () => {
    return (dispatch) => {
        xhr({
            url: `${conf.apibaseurl}listWaka`
        }, (err, resp, body) => {
            var langs = JSON.parse(body);
            var sum = 0;
            var x = [];
            var y = [];
            langs.resultados.forEach(langu => {
                if (langu.percentage > 1) {
                    x.push(langu.lang);
                    y.push(langu.percentage);
                    sum += langu.percentage;
                }
            });
            var data = [{
                type: 'pie',
                labels: x,
                values: y,
            }];
            return dispatch(setWaka(data));
        });
    }
};