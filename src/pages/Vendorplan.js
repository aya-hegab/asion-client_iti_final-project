import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../apis/configpaln';
import { Card, Button } from 'react-bootstrap';
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
const Vendorplan = () => {
    const [plans, setPlans] = useState([]);
    let { plan_id } = useParams();

    useEffect(() => {
        getPlans();
    }, []);
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };
    const getPlans = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/plans/`);
        let data = await response.json();
        setPlans(data);
    };
      ////////////////////
      const navigate = useNavigate();
      const [userId, setUser] = useState(null);
      const [user, setuser] = useState(null);
      useEffect(() => {
        const token = Cookies.get('token');
        const headers = {
          Authorization: `Token ${token}`
        };
      
        axiosInstance.get('http://localhost:8000/api/profile/', { headers })
          .then((res) => {
            setuser(res.data.message)
            setUser(res.data.message.id);
            console.log("ssss",res.data.message.id);
      
          })
          .catch((error) => {
            console.error("Fetch user error:", error);
    
          });
      }, []);

      useEffect(() => {
        if (user && user.usertype === 'customer') {
          navigate("/not-found");
        }
      }, [user, navigate]);
    
    

    console.log("user Id",userId)
    const [subscribe, setsubscribe] = useState(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);
    useEffect(() => {
        // Fetch subscription info for the current vendor
        axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${userId}`)
        .then((res) => {
            setSubscriptionInfo(res.data);
            console.log('SubscriptionInfo updated',subscriptionInfo);
            console.log('SubscriptionInfo updated',res.data);
        })
        .catch((error) => {
            console.error('Error fetching subscription info:', error);
        });
}, [userId]);
console.log('SubscriptionInfo updated',subscriptionInfo);
useEffect(() => {
    console.log('Sub[]onInfo updated',subscriptionInfo && subscriptionInfo.stock);
    if (subscriptionInfo ) {
        const remainingProducts = getRemainingProducts(subscriptionInfo);
        console.log("use eee",remainingProducts);
        const isExpired = remainingProducts <= 0;
        setsubscribe(!isExpired);
        console.log("isExpired",subscribe)
        
        console.log(subscribe) // Update the expired state
       
    }
}, [subscriptionInfo]);


const getRemainingProducts = (subscriptionInfo) => {
    let productLimit = 0;
    console.log('lllllllllll',plans)
    if (subscriptionInfo) {
        const plan = plans.find(plan => plan.id === subscriptionInfo.plan);
        console.log('kkkkkkkkkkkk',plan)
    //  console.log("AAA",plan.count)
     if(plan){
            productLimit = plan.count;
            console.log('ppppp',productLimit)}

    }
    console.log("in eee", subscriptionInfo.stock);
    return productLimit - subscriptionInfo.stock;

};

    return (
        <>
        
       
        <div className='container my-5 py-5'>
            <div className='row'>
                {plans.map(plan => (
                    <div key={plan.id} className='col-lg-4 col-md-6 my-2'>
                        <Card className='p-0'>
                            <Card.Body className='p-0'>
                                <Card.Title className='text-center py-4'
                                    style={{ background: 'linear-gradient(to right, #0072ff, #a239ca)', width: '100%', border: 'none', color: 'white' }}>
                                    {plan.name}
                                </Card.Title>
                                <Card.Text className='text-center'>
                                    {plan.description}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted text-center">$ {plan.price}</Card.Subtitle>
                                <form action={`${API_URL}/api/create-checkout-session/${plan.id}/`} className='text-center' method='POST'>
                                <Button 
                                        variant="primary" 
                                        className='my-3' 
                                        type="submit" 
                                        style={{ background: 'linear-gradient(to right, #0072ff, #00c6ff)', border: 'none' }}
                                        disabled={subscribe}>
                                        Subscribe
                                    </Button>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
       

        </>
        
    );
};

export default Vendorplan;




