import React from 'react';
import { useLocation } from "react-router-dom";


function DeliveryMan() {
    const location = useLocation();
  const { user } = location.state || {};
 
  return (
    <>
      <h1>Welcome {user ? user.first_name : ''}</h1>
     
    </>
  );
}


export default DeliveryMan;