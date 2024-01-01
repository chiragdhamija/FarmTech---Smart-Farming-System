import specs_image1 from './specs_images/one.png'
import specs_image2 from './specs_images/two.png'
import specs_image3 from './specs_images/three.png'

import am_image from './team_members_images/aditya_mishra.jpeg'
import cd_image from './team_members_images/chirag_dhamija.jpeg'
import nb_image from './team_members_images/namrata_baliga.jpeg'
import sj_image from './team_members_images/sanchit_jalan.jpeg'

export const links = [
  {
    id: 1,
    url: '/',
    text: 'HOME',
  },
  {
    id: 2,
    url: '/graphs',
    text: 'SENSORS',
  },
  // {
  //   id: 3,
  //   url: '/features',
  //   text: 'FEATURES',
  // },
  {
    id: 4,
    url: '/alerts',
    text: 'ALERTS',
  },
  {
    id: 5,
    url: '/timeline',
    text: 'TIMELINE',
  },
  {
    id: 6,
    url: '/about',
    text: 'ABOUT',
  },
];

export const specs = [
  {
    id: 1,
    name: "What is Smart Farming?",
    info: "Smart farming represents a significant advancement in agriculture, leveraging technology to optimize and streamline farming processes. One of the key elements of smart farming is the use of sensors, which play a pivotal role in making agriculture more efficient and sustainable. These sensors are deployed across agricultural fields to monitor various parameters such as soil moisture, temperature, humidity, and crop health in real-time. By continuously collecting data, farmers gain valuable insights into their crops and soil conditions. This information enables them to make data-driven decisions, including precise irrigation scheduling, the application of fertilizers and pesticides when and where needed, and early detection of diseases or pests.",
    image: specs_image1
  },
  {
    id: 2,
    name: "What are the advantages of Smart Farming?",
    info: "Firstly, it enhances precision and efficiency by providing real-time data on environmental conditions, soil moisture, and crop health, allowing farmers to make informed decisions and optimize resource utilization. Secondly, it promotes sustainability by reducing water and chemical usage through precise irrigation and targeted application of fertilizers and pesticides, thus minimizing environmental impact. Moreover, smart farming improves crop yields and quality by preventing diseases and pests through early detection and intervention. Additionally, it minimizes labor requirements by automating tasks, reducing the physical burden on farmers. ",
    image: specs_image2
  },
  {
    id: 3,
    name: "What electronic sensors have been used?",
    info: "A comprehensive array of sensors and components has been strategically employed to enhance agricultural processes. The DHT22 sensor provides critical temperature and humidity data, aiding in climate monitoring for optimized irrigation and crop health. An LDR detects light levels, facilitating the management of light-sensitive crops. Soil resistive sensors assess soil moisture levels to guide precise irrigation, preventing overwatering. Soil pH sensors ensure the soil's optimal pH balance for crop growth. VOC sensors monitor air quality for healthier crop environments. Finally, the solenoidal valve, controlled by a relay module, regulates water flow for efficient irrigation, collectively contributing to a more productive and sustainable farming operation.",
    image: specs_image3
  },
];

export const team_members = [
  {
    id: 1,
    name: 'Aditya Mishra',
    job: 'web developer',
    image: am_image,
    text: "Aditya Mishra used React JS to design the website's frontend, ensuring an engaging user experience and adeptly displaying project information efficiently. He enhanced the design by applying CSS to beautify the website, creating an aesthetically pleasing interface.",
  },
  {
    id: 2,
    name: 'Chirag Dhamija',
    job: 'hardware',
    image: cd_image,
    text: 'Chirag Dhamija contributed significantly to the project by effectively calibrating the DHT22 and LDR sensors. His diligent work on the hardware side ensured that these sensors provided accurate and reliable data for the project.',
  },
  {
    id: 3,
    name: 'Namrata Baliga',
    job: 'hardware',
    image: nb_image,
    text: 'Namrata Baliga played a vital role in the project by adeptly calibrating the DHT22 and soil resistive sensors. Her careful attention to detail in the hardware domain ensured that the sensors consistently provided accurate and trustworthy data.',
  },
  {
    id: 4,
    name: 'Sanchit Jalan',
    job: 'hardware',
    image: sj_image,
    text: "Sanchit Jalan made a substantial contribution to the project by skillfully fine-tuning the soil resistive sensor and the LDR sensor. His meticulous efforts on the hardware front guaranteed the sensors' ability to deliver precise and dependable data, which was essential for the project's success.",
  },
];

export const sensors = [
  {
    id: 1,
    name: "DHT22",
    text: "Measures Temperature",
    link: "https://thingspeak.com/channels/2287877/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Temperature&type=line",
    lower_bound: 15,
    upper_bound: 35,
    parameter: "Temperature"
  },
  {
    id: 2,
    name: "Soil Resistive Sensor",
    text: "Measures Soil Moisture",
    link: "https://thingspeak.com/channels/2287877/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Soil+Moisture&type=line",
    lower_bound: 20,
    upper_bound: 60,
    parameter: "Soil moisture"
  },
  {
    id: 3,
    name: "LDR",
    text: "Measures Light Intensity",
    link: "https://thingspeak.com/channels/2287877/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Light+Intensity&type=line",
    lower_bound: 1000,
    upper_bound: 3500,
    parameter: "Light intensity"
  },
  {
    id: 4,
    name: "pH Sensor",
    text: "Measures Soil pH",
    link: "https://thingspeak.com/channels/2287877/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=pH+Sensor&type=line",
    lower_bound: 5,
    upper_bound: 7,
    parameter: "pH Value"
  },
  {
    id: 5,
    name: "SGP30 Sensor for CO2",
    text: "Measures CO2",
    link: "https://thingspeak.com/channels/2287877/charts/5?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=SGP30++Sensor+%28CO2%29&type=line",
    lower_bound: 400,
    upper_bound: 500,
    parameter: "CO2in ppm"
  },
  {
    id: 6,
    name: "SGP30 Sensor for VOC",
    text: "Measures VOC",
    link: "https://thingspeak.com/channels/2287877/charts/6?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=SGP30+Sensor+%28VOC%29&type=line&yaxis=VOC+in+ppb",
    lower_bound: 0,
    upper_bound: 20,
    parameter: "VOC in ppb"
  }
]


export const start_index = [0, 0, 9, 20, 27, 38, 51, 60, 72, 79, 90, 101];


export const om2m_data = [
  [400, 34.0, 6.22, 23.48, 1306, 11],
  [454, 28.0, 6.44, 29.66, 994, 4],
  [427, 32.0, 6.46, 24.55, 1377, 5],
  [438, 35.0, 6.28, 30.05, 1350, 2],
  [452, 29.0, 5.6, 26.24, 986, 0],
  [452, 28.0, 6.21, 28.78, 1119, 11],
  [438, 36.0, 5.71, 29.82, 965, 18],
  [451, 40.0, 6.23, 26.48, 947, 15],
  [401, 40.0, 5.99, 23.87, 1171, 4],
  [411, 35.0, 5.93, 25.6, 1085, 8],
  [452, 32.0, 6.15, 26.78, 1347, 10],
  [434, 30.0, 5.98, 28.64, 874, 9],
  [442, 40.0, 5.65, 28.95, 1190, 0],
  [449, 31.0, 5.97, 26.03, 869, 1],
  [419, 19.0, 5.94, 28.86, 1149, 5],
  [419, 18.0, 5.96, 25.41, 1215, 5],
  [419, 16.0, 5.9, 28.47, 1184, 6],
  [418, 16.0, 5.9, 25.35, 1330, 5],
  [417, 18.0, 5.82, 28.75, 1306, 5],
  [415, 19.0, 6.21, 28.33, 1392, 5],
  [417, 19.0, 6.28, 25.47, 1359, 9],
  [419, 17.0, 5.66, 25.56, 1254, 6],
  [418, 16.0, 5.98, 27.34, 1176, 9],
  [416, 16.0, 6.15, 28.64, 1176, 7],
  [415, 15.0, 6.49, 25.31, 1214, 5],
  [418, 19.0, 5.83, 27.49, 1283, 7],
  [419, 17.0, 5.63, 28.87, 1392, 7],
  [416, 18.0, 6.35, 26.23, 1188, 5],
  [415, 18.0, 6.3, 25.49, 1134, 9],
  [419, 18.0, 6.37, 28.66, 1147, 9],
  [416, 19.0, 5.66, 26.5, 1153, 8],
  [417, 16.0, 6.49, 26.88, 1143, 5],
  [418, 15.0, 5.84, 26.35, 1318, 9],
  [417, 15.0, 6.06, 26.98, 1301, 7],
  [415, 18.0, 6.35, 27.77, 1294, 5],
  [417, 18.0, 5.86, 26.32, 1317, 5],
  [418, 15.0, 6.04, 28.07, 1275, 9],
  [415, 16.0, 5.6, 28.67, 1302, 8],
  [418, 19.0, 5.68, 26.6, 1222, 9],
  [419, 15.0, 6.1, 26.75, 1176, 5],
  [417, 16.0, 5.92, 28.1, 1143, 8],
  [419, 17.0, 5.94, 28.36, 1301, 7],
  [417, 17.0, 6.12, 26.5, 1200, 6],
  [416, 19.0, 5.74, 28.45, 1101, 6],
  [416, 19.0, 5.99, 27.35, 1108, 5],
  [417, 17.0, 6.46, 27.64, 1201, 7],
  [416, 15.0, 6.19, 27.94, 1396, 6],
  [419, 16.0, 6.41, 25.71, 1278, 6],
  [418, 16.0, 5.61, 26.44, 1344, 9],
  [417, 19.0, 6.01, 28.57, 1289, 9],
  [419, 17.0, 6.47, 25.4, 1163, 8],
  [415, 17.0, 6.19, 25.36, 1330, 9],
  [415, 16.0, 6.23, 25.35, 1143, 8],
  [416, 19.0, 5.6, 27.04, 1161, 8],
  [418, 18.0, 5.61, 29.9, 1326, 8],
  [418, 17.0, 6.0, 29.72, 1160, 5],
  [419, 19.0, 5.58, 29.91, 1372, 5],
  [417, 16.0, 5.5, 29.57, 1202, 5],
  [425, 21.0, 6.17, 27.94, 1511, 5],
  [416, 20.0, 6.01, 28.76, 1517, 9],
  [415, 21.0, 6.63, 27.06, 1620, 5],
  [421, 22.0, 6.36, 27.68, 1731, 6],
  [428, 20.0, 6.23, 29.06, 1596, 5],
  [415, 22.0, 6.11, 27.69, 1693, 7],
  [413, 22.0, 6.08, 26.54, 1744, 14],
  [410, 22.0, 6.53, 29.71, 1693, 14],
  [416, 20.0, 6.34, 26.65, 1744, 9],
  [410, 22.0, 6.78, 27.26, 1787, 13],
  [419, 21.0, 6.53, 26.55, 1571, 5],
  [420, 21.0, 6.15, 27.01, 1504, 13],
  [425, 20.0, 6.43, 26.34, 1682, 11],
  [429, 21.0, 6.66, 28.65, 1587, 8],
  [428, 22.0, 6.14, 30.03, 1784, 14],
  [410, 22.0, 6.64, 27.94, 1592, 11],
  [424, 21.0, 6.31, 29.85, 1680, 14],
  [420, 21.0, 6.51, 28.22, 1735, 5],
  [423, 22.0, 6.1, 28.51, 1696, 12],
  [416, 20.0, 6.39, 26.54, 1411, 10],
  [428, 20.0, 6.09, 29.47, 1710, 7],
  [429, 22.0, 6.52, 28.47, 1623, 12],
  [420, 21.0, 6.24, 26.37, 1535, 5],
  [413, 21.0, 6.69, 29.31, 1413, 8],
  [421, 21.0, 6.09, 27.18, 1798, 6],
  [422, 22.0, 6.62, 29.55, 1410, 5],
  [424, 22.0, 6.75, 27.87, 1516, 5],
  [410, 22.0, 6.05, 30.18, 1410, 13],
  [419, 20.0, 6.3, 26.85, 1599, 11],
  [412, 20.0, 6.71, 29.01, 1454, 13],
  [417, 21.0, 6.72, 28.62, 1408, 14],
  [429, 22.0, 6.55, 29.53, 1461, 10],
  [428, 21.0, 6.7, 27.3, 1486, 5],
  [417, 20.0, 6.37, 27.55, 1682, 13],
  [429, 21.0, 6.24, 26.8, 1630, 5],
  [427, 22.0, 6.33, 27.4, 1476, 11],
  [423, 21.0, 6.49, 27.37, 1597, 14],
  [428, 20.0, 6.33, 28.44, 1526, 13],
  [428, 22.0, 6.25, 26.51, 1752, 11],
  [416, 20.0, 6.62, 26.34, 1681, 11],
  [413, 21.0, 6.21, 28.35, 1598, 10],
  [411, 20.0, 6.78, 28.05, 1721, 5],
  [414, 22.0, 6.15, 27.5, 1632, 13],
  [422, 21.0, 6.01, 26.1, 1657, 7],
  [410, 22.0, 6.47, 27.12, 1736, 8],
  [414, 22.0, 6.24, 25.15, 1491, 13],
  [410, 22.0, 6.76, 25.81, 1552, 11],
  [400, 22.0, 6.21, 27.95, 1502, 5],
  [400, 22.0, 6.58, 26.07, 1768, 2],
  [400, 22.0, 6.73, 28.15, 1401, 8],
  [414, 22.0, 6.74, 26.58, 1760, 0],
  [426, 21.0, 6.18, 25.91, 1506, 6],
  [417, 21.0, 6.3, 28.11, 1762, 1],
  [-1, 22.0, 6.15, 25.81, 1514, -1],
]
