import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/API/banners/');
                if (!response.ok) {
                    throw new Error('Failed to fetch banners');
                }
                const data = await response.json();
                setBanners(data);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <section className="banner set-bg" style={{ backgroundImage: `url(${banners[currentIndex]?.image})` }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-7 col-lg-8 m-auto">
                        <div className="banner__slider">
                            {banners.map((banner, index) => (
                                <div key={index} className={`banner__item ${index === currentIndex ? 'active' : ''}`}>
                                    <div className="banner__text-wrapper">
                                        <div className="banner__text ml-5 pl-5" style={{ position: 'absolute' }}>
                                            {/* <span>The CHLOE COLLECTION</span>
                                            <h1>{banner.title}</h1>
                                            <Link to="h">Shop now</Link> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;