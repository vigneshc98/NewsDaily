import React from 'react'

const NewsItem = (props) => {

        let {title,description,imageUrl,newsUrl,author,date1,source}=props;
        return (
            <div>
                <div className="card" >
                    <div style={{display:"flex", justifyContent:"flex-end", position:"absolute", right:0}}>
                        <span class=" badge rounded-pill bg-danger" >{source}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted"> {!author? '': `By ${author}`} on {new Date(date1).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary" rel="noreferrer">Read more</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
