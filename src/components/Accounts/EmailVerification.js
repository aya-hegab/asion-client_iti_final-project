import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
    const { token } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/verify-email?token=${token}`)
          .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error(error);
                alert('Error verifying email.');
            });
    }, [token]);

    return (
        <div>
            <h1>Verifying Email...</h1>
        </div>
    );
};

export default EmailVerification;
