import React from 'react'




import { useState } from 'react';

import { trenditemapi } from './api'
const TrendItem = (props) => {
  console.log(props)
  console.log(trenditemapi)
  const [trenditem,setTrendItem]= useState(trenditemapi)
  return (
    <>
    {trenditem.map((treitem)=>{
      return(
     
      <div className="trend__item"key={treitem.id}>
        <div className="trend__item__pic">
          <img src={treitem.image} alt="" />
        </div>
        <div className="trend__item__text">
          <h6>{treitem.title}</h6>
          <div className="rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <div className="product__price">{treitem.price}</div>
        </div>
      </div>
  
      
     

    )})}
  </>
  )
}

export default TrendItem
