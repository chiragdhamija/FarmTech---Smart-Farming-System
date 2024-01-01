import React from 'react';
import Navbar from './Navbar';
import AboutList from './AboutList';
import "./about.css"

function About() {
  return (
    <>
      <Navbar />
      <div className="title">
        <h2 style={{ marginTop: "2vh" }}>About</h2>
        <div className="underline"></div>
      </div>
      <AboutList />
    </>
  );
}

export default About;
