
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../apis/configpaln';
import { Card, Button } from 'react-bootstrap';
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
const AdminPlan = () => {
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
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        count:''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://127.0.0.1:8000/api/create-plan/', formData, { headers });
            const newPlan = response.data; 
            setPlans([...plans, newPlan]); 
            setFormData({ name: '', description: '', price: '' }); 
            alert('Plan created successfully!');
        } catch (error) {
            console.error('Error creating plan:', error);
            alert('Failed to create plan. Please try again.');
        }
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
//     const [subscribe, setsubscribe] = useState(false);
//     const [subscriptionInfo, setSubscriptionInfo] = useState(null);
//     useEffect(() => {
//         // Fetch subscription info for the current vendor
//         axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${userId}`)
//         .then((res) => {
//             setSubscriptionInfo(res.data);
//         })
//         .catch((error) => {
//             console.error('Error fetching subscription info:', error);
//         });
// }, [userId]);

const handleDelete = async (planId) => {
    try {
        await axiosInstance.delete(`http://127.0.0.1:8000/api/delete-plan/${planId}/`, { headers });
        setPlans(plans.filter(plan => plan.id !== planId)); // Remove the deleted plan from the state
        alert('Plan deleted successfully!');
    } catch (error) {
        console.error('Error deleting plan:', error);
        alert('Failed to delete plan. Please try again.');
    }
};


    return (
        <>
        
       
        <div className='container pt-3'>
        <div>
      <h2>Add Plan</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" style={{width:'92%',height:'40px',border:'1px solid #777'}} name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text"style={{width:'80%',height:'40px',border:'1px solid #777'}} name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" style={{width:'100%',height:'40px',border:'1px solid #777',borderRadius:'5px'}} name="price" value={formData.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          count:
          <input type="number" style={{width:'100%',height:'40px',border:'1px solid #777',borderRadius:'5px'}} name="count" value={formData.count} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" className='my-2' style={{ padding:'10px',background: 'linear-gradient(to right, #0072ff, #00c6ff)', border: 'none',borderRadius:'5px' }}>Create Plan</button>
      </form>
    </div>
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
                      
                                <div style={{ display:'flex',justifyContent:'center' }}>
                                <Button
                                        variant="primary"
                                        className='my-3 text-center'
                                        type="button"
                                        style={{ background: 'linear-gradient(to right, #0072ff, #00c6ff)', border: 'none' }}
                                        onClick={() => handleDelete(plan.id)} // Call handleDelete function with plan id
                                    >
                                        Delete
                                    </Button>
                                    </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
       

        </>
        
    );
};

export default AdminPlan;