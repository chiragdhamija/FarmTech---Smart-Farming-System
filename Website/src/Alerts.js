import React, { useEffect, useLayoutEffect, useState } from 'react';
import Navbar from './Navbar';
import { sensors } from './data';
import "./alerts.css"

import alert_image1 from "./alerts_images/temperature.jpeg"
import alert_image2 from "./alerts_images/soil.jpeg"
import alert_image3 from "./alerts_images/sunlight.jpeg"
import alert_image4 from "./alerts_images/ph.png"
import alert_image5 from "./alerts_images/co2.png"
import alert_image6 from "./alerts_images/voc.png"

const AlertsOne = () => {
    let i = 0;
    const channelID = '2287877';
    const apiKey = 'NKLNG735AJI63UP7';
    const url = `https://api.thingspeak.com/channels/${channelID}/fields/${i + 1}/last.json?api_key=${apiKey}`;
    const [sensorValue, setSensorValue] = useState(null);
    const [alert, setAlert] = useState(0);

    useEffect(() => {
        const checkSensorReading = () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const value = parseFloat(data.field1);

                    if (!isNaN(value) && value < sensors[i].lower_bound) {
                        // if (!isNaN(value)) {
                        setAlert(() => [`${sensors[i].parameter} reading is less than ${sensors[i].lower_bound}: ${value}`]);
                    }
                    else if (!isNaN(value) && value > sensors[i].upper_bound) {
                        setAlert(() => [`${sensors[i].parameter} reading is greater than ${sensors[i].upper_bound}: ${value}`]);
                    }
                    else {
                        setAlert(() => 0);
                    }

                    // Update the sensor value in the state
                    setSensorValue(value);
                })
                .catch((error) => console.error('Error:', error));
        };

        // Check the sensor reading periodically (e.g., every 5 seconds)
        const intervalId = setInterval(checkSensorReading, 5000); // Adjust the interval as needed

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [url, setAlert]);

    if (alert != 0) {
        return (
            <article className='person'>
                <img src={alert_image1} alt={sensors[i].parameter} />
                <div>{alert}</div>
            </article>
        );
    }

};
const AlertsTwo = () => {
    let i = 1;
    const channelID = '2287877';
    const apiKey = 'NKLNG735AJI63UP7';
    const url = `https://api.thingspeak.com/channels/${channelID}/fields/${i + 1}/last.json?api_key=${apiKey}`;
    const [sensorValue, setSensorValue] = useState(null);
    const [alert, setAlert] = useState(0);

    useEffect(() => {
        const checkSensorReading = () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const value = parseFloat(data.field2);

                    if (!isNaN(value) && value < sensors[i].lower_bound) {
                        // if (!isNaN(value)) {
                        setAlert(() => [`${sensors[i].parameter} reading is less than ${sensors[i].lower_bound}: ${value}`]);
                    }
                    else if (!isNaN(value) && value > sensors[i].upper_bound) {
                        setAlert(() => [`${sensors[i].parameter} reading is greater than ${sensors[i].upper_bound}: ${value}`]);
                    }
                    else {
                        setAlert(() => 0);
                    }

                    // Update the sensor value in the state
                    setSensorValue(value);
                })
                .catch((error) => console.error('Error:', error));
        };

        // Check the sensor reading periodically (e.g., every 5 seconds)
        const intervalId = setInterval(checkSensorReading, 5000); // Adjust the interval as needed

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [url, setAlert]);

    if (alert != 0) {
        return (
            <article className='person'>
                <img src={alert_image2} alt={sensors[i].parameter} />
                <div>{alert}</div>
            </article>
        );
    }

};
const AlertsThree = () => {
    let i = 2;
    const channelID = '2287877';
    const apiKey = 'NKLNG735AJI63UP7';
    const url = `https://api.thingspeak.com/channels/${channelID}/fields/${i + 1}/last.json?api_key=${apiKey}`;
    const [sensorValue, setSensorValue] = useState(null);
    const [alert, setAlert] = useState(0);

    useEffect(() => {
        const checkSensorReading = () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const value = parseFloat(data.field3);

                    const currentDate = new Date();
                    const currentHour = currentDate.getHours();

                    console.log("CurrentHour = ", currentHour);
                    console.log("value for LDR = ", value);
                    // After 7 A.M, and before 5 P.M, if the light intensity goes below the lower_bound, then the sunlight is not intense enough
                    // However, during the night, if the light intensity goes below the lower_bound, then no alert message is sent
                    if (!isNaN(value) && value < sensors[i].lower_bound && (currentHour >= 7 && currentHour <= 17)) {
                        // if (!isNaN(value)) {
                        setAlert(() => [`${sensors[i].parameter} reading is less than ${sensors[i].lower_bound}: ${value}`]);
                    }
                    else if (!isNaN(value) && value > sensors[i].upper_bound) {
                        setAlert(() => [`${sensors[i].parameter} reading is greater than ${sensors[i].upper_bound}: ${value}`]);
                    }
                    else {
                        setAlert(() => 0);
                    }

                    // Update the sensor value in the state
                    setSensorValue(value);
                })
                .catch((error) => console.error('Error:', error));
        };

        // Check the sensor reading periodically (e.g., every 5 seconds)
        const intervalId = setInterval(checkSensorReading, 5000); // Adjust the interval as needed

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [url, setAlert]);

    if (alert != 0) {
        return (
            <article className='person'>
                <img src={alert_image3} alt={sensors[i].parameter} />
                <div>{alert}</div>
            </article>
        );
    }

};


const AlertsFour = () => {
    let i = 3;
    const channelID = '2287877';
    const apiKey = 'NKLNG735AJI63UP7';
    const url = `https://api.thingspeak.com/channels/${channelID}/fields/${i + 1}/last.json?api_key=${apiKey}`;
    const [sensorValue, setSensorValue] = useState(null);
    const [alert, setAlert] = useState(0);

    useEffect(() => {
        const checkSensorReading = () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const value = parseFloat(data.field4);

                    if (!isNaN(value) && value < sensors[i].lower_bound) {
                        // if (!isNaN(value)) {
                        setAlert(() => [`${sensors[i].parameter} reading is less than ${sensors[i].lower_bound}: ${value}`]);
                    }
                    else if (!isNaN(value) && value > sensors[i].upper_bound) {
                        setAlert(() => [`${sensors[i].parameter} reading is greater than ${sensors[i].upper_bound}: ${value}`]);
                    }
                    else {
                        setAlert(() => 0);
                    }

                    // Update the sensor value in the state
                    setSensorValue(value);
                })
                .catch((error) => console.error('Error:', error));
        };

        // Check the sensor reading periodically (e.g., every 5 seconds)
        const intervalId = setInterval(checkSensorReading, 5000); // Adjust the interval as needed

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [url, setAlert]);

    if (alert != 0) {
        return (
            <article className='person'>
                <img src={alert_image4} alt={sensors[i].parameter} />
                <div>{alert}</div>
            </article>
        );
    }

};

const AlertsFive = () => {
    let i = 4;
    const channelID = '2287877';
    const apiKey = 'NKLNG735AJI63UP7';
    const url = `https://api.thingspeak.com/channels/${channelID}/fields/${i + 1}/last.json?api_key=${apiKey}`;
    const [sensorValue, setSensorValue] = useState(null);
    const [alert, setAlert] = useState(0);

    useEffect(() => {
        const checkSensorReading = () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const value = parseFloat(data.field5);
                    { console.log("value is: ") }
                    { console.log(value) }
                    if (!isNaN(value) && value < sensors[i].lower_bound) {
                        // if (!isNaN(value)) {
                        setAlert(() => [`${sensors[i].parameter} reading is less than ${sensors[i].lower_bound}: ${value}`]);
                    }
                    else if (!isNaN(value) && value > sensors[i].upper_bound) {
                        setAlert(() => [`${sensors[i].parameter} reading is greater than ${sensors[i].upper_bound}: ${value}`]);
                    }
                    else {
                        setAlert(() => 0);
                    }

                    // Update the sensor value in the state
                    setSensorValue(value);
                })
                .catch((error) => console.error('Error:', error));
        };


        // Check the sensor reading periodically (e.g., every 5 seconds)
        const intervalId = setInterval(checkSensorReading, 5000); // Adjust the interval as needed
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [url, setAlert]);
    if (alert != 0) {
        return (
            <article className='person'>
                <img src={alert_image5} alt={sensors[i].parameter} />
                <div>{alert}</div>
            </article>
        );
    }

};

const AlertsSix = () => {
    let i = 5;
    const channelID = '2287877';
    const apiKey = 'NKLNG735AJI63UP7';
    const url = `https://api.thingspeak.com/channels/${channelID}/fields/${i + 1}/last.json?api_key=${apiKey}`;
    const [sensorValue, setSensorValue] = useState(null);
    const [alert, setAlert] = useState(0);

    useEffect(() => {
        const checkSensorReading = () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const value = parseFloat(data.field6);

                    if (!isNaN(value) && value < sensors[i].lower_bound) {
                        // if (!isNaN(value)) {
                        setAlert(() => [`${sensors[i].parameter} reading is less than ${sensors[i].lower_bound}: ${value}`]);
                    }
                    else if (!isNaN(value) && value > sensors[i].upper_bound) {
                        setAlert(() => [`${sensors[i].parameter} reading is greater than ${sensors[i].upper_bound}: ${value}`]);
                    }
                    else {
                        setAlert(() => 0);
                    }

                    // Update the sensor value in the state
                    setSensorValue(value);
                })
                .catch((error) => console.error('Error:', error));
        };

        // Check the sensor reading periodically (e.g., every 5 seconds)
        const intervalId = setInterval(checkSensorReading, 5000); // Adjust the interval as needed

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [url, setAlert]);

    if (alert != 0) {
        return (
            <article className='person'>
                <img src={alert_image6} alt={sensors[i].parameter} />
                <div>{alert}</div>
            </article>
        );
    }

};
function Alerts() {
    return (
        <>
            <Navbar />
            <div className="title">
                <h2 style={{ marginTop: "2vh" }}>Alerts</h2>
                <div className="underline"></div>
            </div>
            <section className="outer-section">
                <AlertsOne />
                <AlertsTwo />
                <AlertsThree />
                <AlertsFour />
                <AlertsFive />
                <AlertsSix />
            </section>
        </>
    );
}

export default Alerts;
