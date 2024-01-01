import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "./timeline.css"
import ParseData from './ParseData';
import LineChart from './LineChart';
import { sensors } from './data';
import { om2m_data } from './data';
import { start_index } from './data';

// Transpose function to convert rows to columns
// const transpose = (matrix) => matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
const transpose = (matrix) => {
    return matrix[0].map((_, colIndex) => {
        return matrix.map((row) => {
            return row[colIndex] !== null ? row[colIndex] : 0;
        });
    });
};


const PlotArray = ({ id, date, name, array }) => {
    // Assuming you have the array passed as a prop

    const i = parseInt(date);
    const si = start_index[i];
    const ei = start_index[i + 1];

    const subArray = array.slice(si, ei);
    const labels = subArray.map((value, index) => index);


    return (
        <div class="plot_array">
            {/* Other components or content */}
            <LineChart key={id} name={name} data={subArray} labels={labels} />
        </div>
    );
};

const DateForm = ({ onDateChange, onSubmit }) => {
    const [date, setDate] = useState('');

    const handledateChange = (event) => {
        const newDate = event.target.value;
        setDate(newDate);
        onDateChange(newDate); // Call the callback to update the parent state
    };

    const handleClick = () => {
        onSubmit(); // Call the onSubmit callback
    };

    return (
        <div className='center'>
            <div className="inputbox">
                <input
                    type="text"
                    required="required"
                    value={date}
                    onChange={handledateChange}
                />
                <span>Enter Day</span>
            </div>
            <div className="inputbox">
                <button id="submit_button" type="button" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </div>
    );
};



// TIMELINE FUNCTION
const Timeline = () => {

    // Read Data from .txt

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        // Read Data from .txt
        const filePath = './om2m_data.txt';

        fetch(process.env.PUBLIC_URL + filePath)
            .then(response => response.text())
            .then(data => {
                // Parse the JSON string to get the variable
                const parsedData = JSON.parse(data);
                console.log("l90");
                console.log(parsedData);
            })
            .catch(error => console.error('Error reading file:', error));
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    console.log('l96');

    
    // Initialize Variables
    const [arrays, setArrays] = useState([transpose(om2m_data)]);
    const [date, setDate] = useState('1');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleSubmit = () => {
        // Add your submission logic here
        setFormSubmitted(true);
    };

    return (
        <>
            <Navbar />
            <div className="title">
                <h2 style={{ marginTop: "2vh" }}>Timeline</h2>
                <div className="underline"></div>
            </div>
            <DateForm onDateChange={handleDateChange} onSubmit={handleSubmit} />
            {console.log(date)}

            {formSubmitted && (
                <div id="plots_container">
                    {sensors.map((sensor) => {
                        const id = sensor.id;
                        const name = sensor.name;
                        return (
                            <PlotArray
                                className="each_plot"
                                key={id}
                                date={date}
                                name={name}
                                array={arrays[0][id - 1]}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default Timeline;
