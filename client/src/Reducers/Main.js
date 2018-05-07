const initialState = {
    githubData: [],
    wakaData: [],
    knowledgeData: [],
    currentPage: 'GRAPH'
};

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
        case 'FETCH_KNOWLEDGE':
            return {
                ...state,
                knowledgeData: action.knowledgeData
            };
        case 'CHANGE_CURRENT':
            return {
                ...state,
                currentPage: action.selected
            };
        default:
            return state;
    }
}