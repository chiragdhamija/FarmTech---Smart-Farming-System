import React from 'react';



function ParseData(htmlText) {

    // Use regular expressions to extract values from the HTML text
    const regex = /\[([\d.-]+),\s*([\d.-]+),\s*([\d.-]+),\s*([\d.-]+),\s*([\d.-]+),\s*([\d.-]+)\]/g;
    const matches = [...htmlText.matchAll(regex)];

    // Initialize six arrays to store the values
    const array1 = [];
    const array2 = [];
    const array3 = [];
    const array4 = [];
    const array5 = [];
    const array6 = [];

    // Iterate over the matches and store values in respective arrays
    matches.forEach(match => {
        array1.push(parseFloat(match[1]));
        array2.push(parseFloat(match[2]));
        array3.push(parseFloat(match[3]));
        array4.push(parseFloat(match[4]));
        array5.push(parseFloat(match[5]));
        array6.push(parseFloat(match[6]));
    });

    // Return an object containing the arrays
    return {
        array1,
        array2,
        array3,
        array4,
        array5,
        array6
    };
}

export default ParseData;

// TEST CODE
// const htmlContent = `[400, 34.0, 6.22, 23.48, 1306, 11]
// [454, 28.0, 6.44, 29.66, 994, 4]
// [427, 32.0, 6.46, 24.55, 1377, 5]
// [438, 35.0, 6.28, 30.05, 1350, 2]
// [452, 29.0, 5.6, 26.24, 986, 0]`

// const result = ParseData(htmlContent);

// // Access the arrays from the result object
// console.log(result.array1);
// console.log(result.array2);
// console.log(result.array3);
// console.log(result.array4);
// console.log(result.array5);
// console.log(result.array6);


