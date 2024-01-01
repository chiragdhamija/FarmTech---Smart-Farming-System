import React, { useState } from 'react';
import { team_members } from './data.js';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const AboutList = () => {
    const [index, setIndex] = useState(0);
    const { name, job, image, text } = team_members[index];
    const checkNumber = (number) => {
        if (number > team_members.length - 1) {
            return 0;
        }
        if (number < 0) {
            return team_members.length - 1;
        }
        return number;
    };
    const nextPerson = () => {
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };
    const prevPerson = () => {
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    };

    return (
        <article className='review'>
            <div className='img-container'>
                <img src={image} alt={name} className='person-img' />
                <span className='quote-icon'>
                    <FaQuoteRight />
                </span>
            </div>
            <h4 className='author'>{name}</h4>
            <p className='job'>{job}</p>
            <p className='info'>{text}</p>
            <div className='button-container'>
                <button className='prev-btn' onClick={prevPerson}>
                    <FaChevronLeft />
                </button>
                <button className='next-btn' onClick={nextPerson}>
                    <FaChevronRight />
                </button>
            </div>
        </article>
    );
};

export default AboutList;