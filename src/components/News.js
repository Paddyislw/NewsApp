import { toHaveAttribute } from '@testing-library/jest-dom/dist/matchers';
import React, {useEffect, useState} from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {
 const [article, setArticle] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(1)
 const [disabled, setDisabled] = useState(false)
 const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // 
  
useEffect(async() => {
  document.title = `${capitalizeFirstLetter(props.category)}-News Monkey`
  props.setProgress(0);
    let urofapi = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category
      }&apiKey=7c8bea014c6d4e1eaaa65c0853a865c2&pageSize=${props.pagesize}`;
      props.setProgress(30);
    setLoading(true)
    let data = await fetch(urofapi);
    props.setProgress(70);
    let parsedData = await data.json();
    setArticle(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
    
}, [])


  // async componentDidMount() {
    
  // }
  // handleNext = async () => {

  //   if (Math.ceil(this.state.totalResults / props.pagesize) > this.state.page) {
  //     let urofapi = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category
  //       }&apiKey=7c8bea014c6d4e1eaaa65c0853a865c2&page=${this.state.page + 1}&pageSize=${props.pagesize}`;
  //     this.setState({ loading: true })
  //     let data = await fetch(urofapi);
  //     let parsedData = await data.json();
  //     this.setState({
  //       page: this.state.page + 1,
  //       article: parsedData.articles,
  //       totalResults: parsedData.totalResults,
  //       loading: false
  //     })
  //     if (Math.ceil(this.state.totalResults / props.pagesize) - 1 === this.state.page) { this.setState({ disabled: true }) }
  //   }

  // }
  // handlePrev = async () => {
  //   let urofapi = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category
  //     }&apiKey=7c8bea014c6d4e1eaaa65c0853a865c2&page=${this.state.page - 1}&pageSize=${props.pagesize}`;
  //   let data = await fetch(urofapi);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     article: parsedData.articles,
  //     totalResults: parsedData.totalResults
  //   })
  //   if (Math.ceil(this.state.totalResults / props.pagesize) - 1 === this.state.page) { this.setState({ disabled: true }) } else { this.setState({ disabled: false }) }
  // }
  const fetchMoreData = async()=>{
    
    const urofapi = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category
        }&apiKey=7c8bea014c6d4e1eaaa65c0853a865c2&page=${page+1}&pageSize=${props.pagesize}`;
        setPage(page+1)
    let data = await fetch(urofapi);
    let parsedData = await data.json();
    setArticle(article.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }
    return (
      <>
        <h2 className='text-center' style={{marginTop:'90px',marginBottom:'30px'}}>{`News Headlines (${capitalizeFirstLetter(props.category)})`}</h2>
         {loading && <Loading />}
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length!==totalResults}
          loader={loading && <Loading/>}
        >
          <div className='container'>
          <div className='row'>
            {article.map((e) => {
              return <div className='col-md-4' key={e.url}><NewsItem title={e.title } description={e.description && e.description.slice(0, 80)} imageUrl={e.urlToImage ? e.urlToImage : `https://img.etimg.com/thumb/msid-90518100,width-1070,height-580,imgsize-2010750,overlay-etpanache/photo.jpg`} newsUrl={e.url} author={e.author ? e.author : 'unknown'} time={(new Date(e.publishedAt).toUTCString())} /></div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button type="button" className="btn btn-dark" onClick={this.handlePrev} disabled={this.state.page <= 1}> &laquo; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNext} disabled={this.state.disabled}>Next &raquo;</button>
        </div> */}
      </>
    )
}
News.defaultProps = {
  country: 'in',
  pagesize: 10,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}

export default News