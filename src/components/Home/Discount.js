import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../apis/config";
import { Link } from 'react-router-dom';

const Discount = () => {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [discountData, setDiscountData] = useState(null); 
    useEffect(() => {
        axiosInstance
            
                .get('/API/discounts/')
                .then((res) =>setDiscountData(res.data))
                .catch((err)=>console.log(err));
                
           
        
       
        
            }, []);
        console.log(discountData)
        useEffect(() => {
        const calculateCountdown = () => {
            if (!discountData || !discountData.length) {
                // If discountData is null or empty, set countdown to default values
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
        
            const endDate = new Date(discountData[0].end_date); // Adjust the end date as needed
            const now = new Date();
            const difference = endDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setCountdown({ days, hours, minutes, seconds });
            } else {
                // Countdown is over
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, [discountData]);
    if (!discountData) {
        return null; // Or you can render a loading indicator
    }

    return (
        <section className="discount">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 p-0">
                        <div className="discount__pic">
                            <img src={discountData && discountData[0].image} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 p-0">
                        <div className="discount__text">
                            <div className="discount__text__title">
                                <span>{discountData && discountData[0].title}</span>
                                <h2>{discountData && discountData[0].description}</h2>
                                <h5><span>Sale</span>{discountData && discountData[0].sale_percentage} %</h5>
                            </div>
                            <div className="discount__countdown" id="countdown-time">
                                <div className="countdown__item">
                                    <span>{countdown.days}</span>
                                    <p>Days</p>
                                </div>
                                <div className="countdown__item">
                                    <span>{countdown.hours}</span>
                                    <p>Hours</p>
                                </div>
                                <div className="countdown__item">
                                    <span>{countdown.minutes}</span>
                                    <p>Min</p>
                                </div>
                                <div className="countdown__item">
                                    <span>{countdown.seconds}</span>
                                    <p>Sec</p>
                                </div>
                            </div>
                            {/* <Link a="h">Shop now</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Discount;