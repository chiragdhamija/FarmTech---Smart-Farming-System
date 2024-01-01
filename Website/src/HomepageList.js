import React from 'react';
import HomepageListElement from './HomepageListElement';
import { specs } from './data.js'


const HomepageList = () => {
  return (
    <section>
      <div className="title">
        <h2></h2>
        {/* <div className="underline"></div> */}
      </div>
      <div className='tours-container'>
        {specs.map((spec) => {
          return <HomepageListElement key={spec.id} {...spec} />;
        })}
      </div>
    </section>
  );
};

export default HomepageList;