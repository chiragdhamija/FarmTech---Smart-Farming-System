import React, { useState } from 'react'
import { sensors } from "./data.js"
import "./graphtabs.css"

function GraphTabs() {
    const [value, setValue] = useState(0)
    const { id, name, text, link } = sensors[value]
    return (
        <>
            <div className="title">
                <h2 style={{ marginTop: "2vh" }}>Sensor Details and Graphs</h2>
                <div className="underline"></div>
            </div>
            <div className="jobs-center">
                {/* btn container */}
                <div className="btn-container">
                    {sensors.map((item, index) => {
                        return (
                            <button
                                key={item.id}
                                onClick={() => setValue(index)}
                                className={`job-btn ${index === value && 'active-btn'}`}
                            >
                                {item.name}
                            </button>
                        )
                    })}
                </div>
                {/* job info */}
                <article className="job-info">
                    <h3>{name}</h3>
                    <h4>{text}</h4>
                    <iframe className="sensor-graph" src={link}></iframe>
                </article>
            </div>
        </>
    )
}

export default GraphTabs