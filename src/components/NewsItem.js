import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

const NewsItem = (props)=> {
        let { title, description, imageUrl, newsUrl, author, time } = props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">      
                        <h5 className="card-title">{title}
                        <div className='bade' style={{display:'flex',justifyContent:'flex-end'}}>
                        <span className="position-absolute top-0 right-0 translate-middle badge rounded-pill bg-danger" style={{right:'0px'}}>{author}</span>
                        </div>
                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">Last updated by {author} at {time}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div></div>
        )
    
}

export default NewsItem