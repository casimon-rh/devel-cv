const initialState = {
    githubData: [],
    wakaData: []
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_GITHUB':
            return {
                ...state,
                githubData: action.githubData
            };
            case 'FETCH_WAKA':
                return {
                    ...state,
                    wakaData: action.wakaData
                };
        default:
            return state;
    }
}