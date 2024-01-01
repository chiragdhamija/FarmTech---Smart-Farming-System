import React, { useState } from 'react';

const HomepageListElement = ({ id, image, info, name }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <article className="single-tour">
      <img src={image} alt={name} className='single-tour-image' />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : '  read more'}
          </button>
        </p>
      </footer>
    </article>
  );
};

export default HomepageListElement;