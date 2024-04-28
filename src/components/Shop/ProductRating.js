import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

const ProductRating = ({ rating }) => {
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} style={{ color: '#e3c01c', fontSize: '12px' }} />);
        }

        // Half star (if applicable)
        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon icon={faStarHalfAlt} style={{ color: '#e3c01c', fontSize: '12px' }} key="half" />);
        }

        // Empty stars
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon icon={farStar} style={{ fontSize: '12px' }} key={`empty-${i}`} />);
        }

        return stars;
    };

    return (
        <div>
            {renderStars()}
        </div>
    );
};

export default ProductRating;