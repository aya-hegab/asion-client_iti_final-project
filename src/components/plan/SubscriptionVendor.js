import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionVendor = ({ vendorId }) => {
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);
    const [expired, setExpired] = useState(false); // State to track if subscription has expired
    const [subtractionResult, setSubtractionResult] = useState(null);
    const [Plan, setPlan] = useState(null);


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${vendorId}`)
            .then((res) => {
                setSubscriptionInfo(res.data); // Assuming the response includes plan information
            })
            .catch((error) => {
                console.error('Error fetching subscription info:', error);
            });
    }, [vendorId]); 
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/plans/`)
            .then((res) => {
                setPlan(res.data); // Assuming the response includes plan information
            })
            .catch((error) => {
                console.error('Error fetching subscription info:', error);
            });
    }, [vendorId]); 

    // console.log('Subscription', subscriptionInfo)

    useEffect(() => {
        if (subscriptionInfo && subscriptionInfo.plan && Plan) {
            console.log("plammn",Plan)
            console.log(subscriptionInfo && subscriptionInfo.plan && Plan)
            // Define the number of products for each plan
            const productLimits = {};
            
                console.log('plan', Plan)
                Plan.forEach(plan => {
                    productLimits[plan.id] = plan.count;
                });
            
            console.log("true", subscriptionInfo.plan);
            console.log("true", productLimits);
            if (subscriptionInfo.plan in productLimits) {
                console.log("true", subscriptionInfo.plan);
                console.log("true", productLimits);
                const remainingProducts = productLimits[subscriptionInfo.plan] - subscriptionInfo.stock;
                setSubtractionResult(remainingProducts);
                setExpired(false); // Subscription not expired
            } else {
                console.error('Plan type not found:', subscriptionInfo.plan);
            }
        }
    }, [subscriptionInfo, Plan]);
    
    // console.log("njnj",subtractionResult)

    return (
        <div>
           {subtractionResult !== null ? (
    <p>
        <span className='font-weight-bold'>Remaining products from subscription: </span>
        {subtractionResult > 0 ? (
            <span className='font-weight-bold' style={{ color: expired ? 'red' : 'inherit' }}>{subtractionResult}</span>
        ) : (
            <span style={{ color: 'red' }}> Subscription Expired</span>
        )}
    </p>
) : (
    <p>
        <span className='font-weight-bold' style={{color:'#0a859b'}}>No plan yet, but planning to subscribe</span>
    </p>
)}

        </div>
    );
};

export default SubscriptionVendor;