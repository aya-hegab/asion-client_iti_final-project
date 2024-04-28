import React from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from "../../apis/config";
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Additional validation if needed
        if (!formData.name || !formData.email || !formData.message) {
          console.error('Please fill in all fields.');
          return;
        }
    
        try {
          const response = await axiosInstance.post('/API/contact/', formData);
    
          if (response.status === 201) {
            console.log('Message sent successfully!');
            // Optionally, reset the form or navigate to another page.
            setFormData({
              name: '',
              email: '',
              message: '',
            });
          } else {
            console.error('Failed to send message');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  return (
    <>
     {/* Breadcrumb Begin  */}
    <div className="breadcrumb-option">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__links">
                        <Link to="/"><i className="fa fa-home"></i> Home</Link>
                        <span>Contact</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Breadcrumb End  */}

     {/* Contact Section Begin  */}
    <section className="contact spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="contact__content">
                        <div className="contact__address">
                            <h5>Contact info</h5>
                            <ul>
                                <li>
                                    <h6><i className="fa fa-map-marker"></i> Address</h6>
                                    <p>160 Pennsylvania Ave NW, Washington, Castle, PA 16101-5161</p>
                                </li>
                                <li>
                                    <h6><i className="fa fa-phone"></i> Phone</h6>
                                    <p><span>125-711-811</span><span>125-668-886</span></p>
                                </li>
                                <li>
                                    <h6><i className="fa fa-headphones"></i> Support</h6>
                                    <p>Support.photography@gmail.com</p>
                                </li>
                            </ul>
                        </div>
                        <div className="contact__form">
                            <h5>SEND MESSAGE</h5>
                            <form onSubmit={handleSubmit}>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            <input type="text" name="email" placeholder="Email"  value={formData.email} onChange={handleChange} required/>
                            {/* <input type="text" name="website" placeholder="Website" /> */}
                            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required ></textarea>
                            <button type="submit" className="site-btn">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="contact__map">
                    <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48158.305462977965!2d-74.13283844036356!3d41.02757295168286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e440473470d7%3A0xcaf503ca2ee57958!2sSaddle%20River%2C%20NJ%2007458%2C%20USA!5e0!3m2!1sen!2sbd!4v1575917275626!5m2!1sen!2sbd"
                          height="780"
                          style={{ border: 0 }}
                          allowfullscreen=""
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
</section>
 {/* Contact Section End  */}
    
    </>
  )
}

export default Contact
