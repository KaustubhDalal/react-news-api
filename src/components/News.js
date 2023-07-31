import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { async } from "q";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=373261279e494826a0becdd5783e7cff&page=1";
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ 
      articles: parseData.articles,
      totalResults : parseData.totalResults 
    });
  }

  handleNextClick = async () =>{
    if(this.state.page+1> Math.ceil(this.state.totalResults/20)){

    }else{
      let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=373261279e494826a0becdd5783e7cff&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page : this.state.page + 1,
        articles: parseData.articles
      })
    }
  }

  handlePrevClick =  async () =>{
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=373261279e494826a0becdd5783e7cff&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page : this.state.page - 1,
      articles: parseData.articles
    })
  }
  render() { 
    return (
      <div className="container my-3">
        <h2>News-Vantage Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div key={element.url} className="col-md-4">
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
