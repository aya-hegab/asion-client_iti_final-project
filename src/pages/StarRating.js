import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating, handleRate }) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((value, i) => (
        <span
          key={value}
          className={`star`}
          onClick={() => handleRate(value)}
          style={{ color: value <= rating ? '#fff220' : 'inherit' }}
        >
          <FontAwesomeIcon icon={value <= rating ? fasStar : farStar} key={`star-${i}`} />
        </span>
      ))}
    </>
  );
};

export default StarRating;
