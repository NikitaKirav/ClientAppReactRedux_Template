import { blogAPI } from "../api/api.js";

const SET_ARTICLES = 'SET_ARTICLES';


let initialState = {
    articles: "test"  
}

const articlesReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ARTICLES:  {
            return {
                ...state,
                articles: action.articles,
            };
        }
        default:
            return state;
    }
}

export const setArticles = (articles) => {
    return {
        type: SET_ARTICLES, 
        articles: articles
    }
}

export const getArticles = () => (dispatch) => {
    blogAPI.getArticles().then(articles => {
         dispatch(setArticles(articles));
    });       
}


export default articlesReducer;
