#include <DHT.h>
#include "WiFi.h"
#include "ThingSpeak.h"
#include <Wire.h>
#include <EEPROM.h>  // Include the EEPROM library
#include "Adafruit_SGP30.h"
#include <time.h>
#include <HTTPClient.h>



char *ssid = "Chirag'sVivo";
char *pass = "bethebeast";

#define ChannelID 2287877
#define WriteAPIKey "NN6MX8VKRB8HL3O5"

#define CSE_IP "192.168.121.237"  /////////////////////////////////////////////////////
#define CSE_PORT 8080
#define OM2M_ORGIN "admin:admin"
#define OM2M_MN "/~/in-cse/in-name/"
#define OM2M_AE "AE-TEST"
#define INTERVAL 15000L

#define OM2M_DATA_CONT_TEMP "Temperature/Data"
#define OM2M_DATA_CONT_PH "pH/Data"
#define OM2M_DATA_CONT_MOISTURE "Moisture/Data"
#define OM2M_DATA_CONT_LDR "LDR/Data"
#define OM2M_DATA_CONT_CO2 "CO2/Data"
#define OM2M_DATA_CONT_VOC "VOC/Data"
#define WATER_LEVEL 15

const char *ntpServer = "pool.ntp.org";
long int prev_millis = 0;
unsigned long epochTime;
HTTPClient http;



#define DHT_SENSOR_PIN 26  // ESP32 pin GPIO21 connected to DHT22 sensor
#define DHT_SENSOR_TYPE DHT22
#define RELAY_PIN 18  // ESP32 pin GPIO18, which connects to the water valve via the relay
#define AOUT_PIN 35   // ESP32 pin GPIO36 (ADC0) that connects to AOUT pin of moisture sensor

unsigned long getTime() {
  struct tm timeinfo;
  time_t now = getLocalTime(&timeinfo);

  if (!getLocalTime(&timeinfo)) {
    // Serial.println("Failed to obtain time");
    return (0);
  }
  time(&now);
  return now;
}



const int ldrPin = 34;
int dryValue = 4095;
int wetValue = 1050;
int wetValue2 = 550;
const int potPin = 33;
float ph;
float Value = 0;
DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);
DHT dht_sensor2(19, DHT_SENSOR_TYPE);

void ConnectWifi();
WiFiClient client;

Adafruit_SGP30 sgp;
TwoWire myWire(0);  // Create a TwoWire object
bool saveBaselineValues(uint16_t TVOC_base, uint16_t eCO2_base);
bool loadBaselineValues(uint16_t &TVOC_base, uint16_t &eCO2_base);
void setup() {
  Serial.begin(9600);
  ConnectWifi();
  configTime(0, 0, ntpServer);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(potPin, INPUT);
  dht_sensor.begin();   // Initialize the DHT sensor
  dht_sensor2.begin();  // Initialize the DHT sensor
  // delay(2000); // Wait for the sensor to stabilize
  ThingSpeak.begin(client);
  myWire.begin();

  if (!sgp.begin(&myWire)) {
    Serial.println("SGP30 sensor not found :(");
    //while (1);
  }
  delay(10000);
  Serial.println("SGP30 sensor found!");
  uint16_t TVOC_base, eCO2_base;
  if (loadBaselineValues(TVOC_base, eCO2_base)) {
    if (!sgp.setIAQBaseline(eCO2_base, TVOC_base)) {
      Serial.println("Failed to set baseline readings");
    } else {
      Serial.print("Baseline values loaded: eCO2=");
      Serial.print(eCO2_base);
      Serial.print(" ppm, TVOC=");
      Serial.print(TVOC_base);
      Serial.print(" ppb");
    }
  } else {
    Serial.println("Failed to load baseline values");
  }
}


void loop() {
  //Serial.println("hi");
  // Read humidity
  digitalWrite(RELAY_PIN,HIGH);  // close valve 15 seconds
  float humi = dht_sensor.readHumidity();
  // Read temperature in Celsius
  float tempC = dht_sensor.readTemperature();
  // Read temperature in Fahrenheit
  float tempF = dht_sensor.readTemperature(true);

  float humi2 = dht_sensor2.readHumidity();
  // Read temperature in Celsius
  float tempC2 = dht_sensor2.readTemperature();
  // Read temperature in Fahrenheit
  float tempF2 = dht_sensor2.readTemperature(true);
  if (isnan(tempC) || isnan(tempF) || isnan(humi)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Humidity: ");
    Serial.print(humi);
    Serial.print("%");

    Serial.print("  |  ");

    Serial.print("Temperature: ");
    Serial.print(tempC);
    Serial.print("°C  ~  ");
    Serial.print(tempF);
    Serial.println("°F");
  }

  // Check whether the reading is successful or not
  if (isnan(tempC2) || isnan(tempF2) || isnan(humi2)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Humidity: ");
    Serial.print(humi2);
    Serial.print("%");

    Serial.print("  |  ");

    Serial.print("Temperature: ");
    Serial.print(tempC2);
    Serial.print("°C  ~  ");
    Serial.print(tempF2);
    Serial.println("°F");
  }
  int value = analogRead(AOUT_PIN);
  int value2 = analogRead(32);
  int percent = 100 - (value - wetValue) * 100 / (dryValue - wetValue);
  int percent2 = 100 - (value2 - wetValue2) * 100 / (dryValue - wetValue2);
  // Serial.println(value);
  // Serial.println(value2);
  Serial.print("Percentage: ");
  Serial.print(percent);
  Serial.println("%");
  Serial.print("Percentage: ");
  Serial.print(percent2);
  Serial.println("%");
  Value = analogRead(potPin);
  Serial.print(Value);
  Serial.print(" | ");
  float voltage = Value * (3.3 / 4095.0);
  ph = (3.3 * voltage);
  Serial.println(ph);
  if (!sgp.IAQmeasure()) {
    Serial.println("Measurement failed");
    return;
  }

  Serial.print("TVOC: ");
  Serial.print(sgp.TVOC);
  Serial.print(" ppb\t");
  Serial.print("eCO2: ");
  Serial.print(sgp.eCO2);
  Serial.println(" ppm");
  int co2_reading = sgp.eCO2;
  int voc_reading = sgp.TVOC;

  // Store baseline values periodically (e.g., once a day)
  static unsigned long lastBaselineSave = 0;
  if (millis() - lastBaselineSave > 86400000UL) {  // Save baseline every 24 hours
    uint16_t TVOC_base, eCO2_base;
    if (sgp.getIAQBaseline(&eCO2_base, &TVOC_base)) {
      if (saveBaselineValues(TVOC_base, eCO2_base)) {
        Serial.print("Baseline values saved: eCO2=");
        Serial.print(eCO2_base);
        Serial.print(" ppm, TVOC=");
        Serial.print(TVOC_base);
        Serial.print(" ppb");
      } else {
        Serial.println("Failed to save baseline values");
      }
      lastBaselineSave = millis();
    } else {
      Serial.println("Failed to get baseline readings");
    }
  }
  // Wait 2 seconds between readings

  int ldrvalue = analogRead(ldrPin);
  Serial.print("LDR Reading: ");
  Serial.println(ldrvalue);
  //Serial.println("High Sent");
  //delay(10000);
  //Serial.println(" LOW Sent");

  float temp = (tempC + tempC2) / 2;
  float moisture = (percent + percent2) / 2;
  float avg_water=(percent + percent2) / 2;
  if(avg_water<WATER_LEVEL)
  {
    //open the valve for 4 seconds such that the water flows
    digitalWrite(RELAY_PIN, LOW);  // open valve 15 seconds
    Serial.println("Valve is opened water is flowing");
    delay(10000);
    digitalWrite(RELAY_PIN,HIGH);  // close valve 15 seconds
  }

  ThingSpeak.setField(1, (tempC + tempC2) / 2);
  ThingSpeak.setField(2, (percent + percent2) / 2);
  ThingSpeak.setField(3, ldrvalue);
  ThingSpeak.setField(4, ph);
  if (co2_reading != 400 || voc_reading != 0)
  {
    ThingSpeak.setField(5, co2_reading);
    ThingSpeak.setField(6, voc_reading);
  }
  ThingSpeak.writeFields(ChannelID, WriteAPIKey);
  if (millis() - prev_millis >= INTERVAL) {
    epochTime = getTime();
    String data;
    String server = "http://" + String() + CSE_IP + ":" + String() + CSE_PORT + String() + OM2M_MN;

    http.begin(server + String() + OM2M_AE + "/" + OM2M_DATA_CONT_TEMP + "/");

    http.addHeader("X-M2M-Origin", OM2M_ORGIN);
    http.addHeader("Content-Type", "application/json;ty=4");
    http.addHeader("Content-Length", "100");

    // data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]";
    data = "[" + String(epochTime) + ", " + String(temp) + "]";
    // data = "["+ String(sensordata) +   + "]";

    Serial.println(data);
    String req_data = String() + "{\"m2m:cin\": {"

                      + "\"con\": \"" + data + "\","

                      + "\"lbl\": \"" + "V1.0.0" + "\","

                      //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

                      + "\"cnf\": \"text\""

                      + "}}";

    Serial.println(req_data);
    int code = http.POST(req_data);
    http.end();



    http.begin(server + String() + OM2M_AE + "/" + OM2M_DATA_CONT_PH + "/");

    http.addHeader("X-M2M-Origin", OM2M_ORGIN);
    http.addHeader("Content-Type", "application/json;ty=4");
    http.addHeader("Content-Length", "100");

    // data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]";
    data = "[" + String(epochTime) + ", " + String(ph) + "]";
    // data = "["+ String(sensordata) +   + "]";

    Serial.println(data);
    req_data = String() + "{\"m2m:cin\": {"

               + "\"con\": \"" + data + "\","

               + "\"lbl\": \"" + "V1.0.0" + "\","

               //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

               + "\"cnf\": \"text\""

               + "}}";

    Serial.println(req_data);
    code = http.POST(req_data);
    http.end();


    http.begin(server + String() + OM2M_AE + "/" + OM2M_DATA_CONT_MOISTURE + "/");

    http.addHeader("X-M2M-Origin", OM2M_ORGIN);
    http.addHeader("Content-Type", "application/json;ty=4");
    http.addHeader("Content-Length", "100");

    // data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]";
    data = "[" + String(epochTime) + ", " + String(moisture) + "]";
    // data = "["+ String(sensordata) +   + "]";

    Serial.println(data);
    req_data = String() + "{\"m2m:cin\": {"

               + "\"con\": \"" + data + "\","

               + "\"lbl\": \"" + "V1.0.0" + "\","

               //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

               + "\"cnf\": \"text\""

               + "}}";

    Serial.println(req_data);
    code = http.POST(req_data);
    http.end();

    http.begin(server + String() + OM2M_AE + "/" + OM2M_DATA_CONT_LDR + "/");

    http.addHeader("X-M2M-Origin", OM2M_ORGIN);
    http.addHeader("Content-Type", "application/json;ty=4");
    http.addHeader("Content-Length", "100");

    // data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]";
    data = "[" + String(epochTime) + ", " + String(ldrvalue) + "]";
    // data = "["+ String(sensordata) +   + "]";

    Serial.println(data);
    req_data = String() + "{\"m2m:cin\": {"

               + "\"con\": \"" + data + "\","

               + "\"lbl\": \"" + "V1.0.0" + "\","

               //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

               + "\"cnf\": \"text\""

               + "}}";

    Serial.println(req_data);
    code = http.POST(req_data);
    http.end();
    if (co2_reading != 400 || voc_reading != 0) 
    {
      http.begin(server + String() + OM2M_AE + "/" + OM2M_DATA_CONT_CO2 + "/");

      http.addHeader("X-M2M-Origin", OM2M_ORGIN);
      http.addHeader("Content-Type", "application/json;ty=4");
      http.addHeader("Content-Length", "100");

      // data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]";
      data = "[" + String(epochTime) + ", " + String(co2_reading) + "]";
      // data = "["+ String(sensordata) +   + "]";

      Serial.println(data);
      req_data = String() + "{\"m2m:cin\": {"

                 + "\"con\": \"" + data + "\","

                 + "\"lbl\": \"" + "V1.0.0" + "\","

                 //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

                 + "\"cnf\": \"text\""

                 + "}}";

      Serial.println(req_data);
      code = http.POST(req_data);
      http.end();
      http.begin(server + String() + OM2M_AE + "/" + OM2M_DATA_CONT_VOC + "/");

      http.addHeader("X-M2M-Origin", OM2M_ORGIN);
      http.addHeader("Content-Type", "application/json;ty=4");
      http.addHeader("Content-Length", "100");

      // data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]";
      data = "[" + String(epochTime) + ", " + String(voc_reading) + "]";
      // data = "["+ String(sensordata) +   + "]";

      Serial.println(data);
      req_data = String() + "{\"m2m:cin\": {"

                 + "\"con\": \"" + data + "\","

                 + "\"lbl\": \"" + "V1.0.0" + "\","

                 //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

                 + "\"cnf\": \"text\""

                 + "}}";

      Serial.println(req_data);
      code = http.POST(req_data);
      http.end();
    }
    else
    {
      co2_reading=-1;
      voc_reading=-1;
      http.begin(server + String() + OM2M_AE + "/" + OM2M_DATA_CONT_CO2 + "/");

      http.addHeader("X-M2M-Origin", OM2M_ORGIN);
      http.addHeader("Content-Type", "application/json;ty=4");
      http.addHeader("Content-Length", "100");

      // data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]";
      data = "[" + String(epochTime) + ", " + String(co2_reading) + "]";
      // data = "["+ String(sensordata) +   + "]";

      Serial.println(data);
      req_data = String() + "{\"m2m:cin\": {"

                 + "\"con\": \"" + data + "\","

                 + "\"lbl\": \"" + "V1.0.0" + "\","

                 //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

                 + "\"cnf\": \"text\""

                 + "}}";

      Serial.println(req_data);
      code = http.POST(req_data);
      http.end();
      http.begin(server + String() + OM2M_AE + "/" + OM2M_DATA_CONT_VOC + "/");

      http.addHeader("X-M2M-Origin", OM2M_ORGIN);
      http.addHeader("Content-Type", "application/json;ty=4");
      http.addHeader("Content-Length", "100");

      // data = "[" + String(epochTime) + ", " + String(occupancy) + ", " + String(distance) +   + "]";
      data = "[" + String(epochTime) + ", " + String(voc_reading) + "]";
      // data = "["+ String(sensordata) +   + "]";

      Serial.println(data);
      req_data = String() + "{\"m2m:cin\": {"

                 + "\"con\": \"" + data + "\","

                 + "\"lbl\": \"" + "V1.0.0" + "\","

                 //+ "\"rn\": \"" + "cin_"+String(i++) + "\","

                 + "\"cnf\": \"text\""

                 + "}}";

      Serial.println(req_data);
      code = http.POST(req_data);
      http.end();
    }
    prev_millis = millis();
  }
  delay(2000);
}

void ConnectWifi() {
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi!");
}
bool loadBaselineValues(uint16_t &TVOC_base, uint16_t &eCO2_base) {
  // Read baseline values from EEPROM
  EEPROM.get(0, TVOC_base);
  EEPROM.get(2, eCO2_base);
  // Check if the values are valid (you may need to add additional checks)
  return (TVOC_base != 0xFFFF && eCO2_base != 0xFFFF);
}

bool saveBaselineValues(uint16_t TVOC_base, uint16_t eCO2_base) {
  // Write baseline values to EEPROM
  EEPROM.put(0, TVOC_base);
  EEPROM.put(2, eCO2_base);
  // Commit the changes to EEPROM
  EEPROM.commit();
  // Check if the values were written successfully
  return true;  // Modify this as needed
}