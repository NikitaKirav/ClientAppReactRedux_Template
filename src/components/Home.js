import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {getArticles} from '../redux/articles-reducer.js';


const Home = (props) => {

    useEffect(() => {
        props.getArticles();      
    },[props.articles]);

    return (
      <div>
        <h1>{props.articles}</h1>        
      </div>
    );
}

const mapStateToProps = (state) => ({
    articles: state.blog.articles
});

export default connect(mapStateToProps, {getArticles})(Home);