import React from 'react'



import { useState } from 'react';

import { instagramapi } from './api'
import { Link } from 'react-router-dom';
const Instagram = () => {
    console.log(instagramapi)
    const [instagram,setInstagram]= useState(instagramapi)
  return (
    <>

      <div className="instagram">
    <div className="container-fluid">
        <div className="row">
        {instagram.map(inst=>{
                return(

                    <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                    <div className="instagram__item set-bg" style={{ backgroundImage: `url(${inst.image})` }}>
                        <div className="instagram__text">
                            <i className="fab fa-instagram"></i>
                            <Link to="https://www.instagram.com/toka_arif?igsh=OXoycnUyNmJlcTVt">@ ashion_shop</Link>
                        </div>
                    </div>
                </div>
                )
            })}

        </div>
    </div>
</div>
    </>
  )
}

export default Instagram
