import requests

url = "http://192.168.121.237:5000/get_data"  # Replace with the server's IP address

response = requests.get(url)
f1 = open("esw.txt", "w")
f1.close()

if response.status_code == 200:
    data_from_server = response.json().get('data', '')

    # Extract data for each parameter
    co2_data = data_from_server["CO2"]
    voc_data = data_from_server["VOC"]
    ph_data = data_from_server["pH"]
    temp_data = data_from_server["Temperature"]
    moisture_data = data_from_server["Moisture"]
    ldr_data = data_from_server["LDR"]

    # Process co2_data
    co2_values = co2_data.split('][')
    co2_values[0] = co2_values[0][1:]
    co2_values[-1] = co2_values[-1][:-1]

    # Process moisture_data
    moisture_values = moisture_data.split('][')
    moisture_values[0] = moisture_values[0][1:]
    moisture_values[-1] = moisture_values[-1][:-1]

    # Process ph_data
    ph_values = ph_data.split('][')
    ph_values[0] = ph_values[0][1:]
    ph_values[-1] = ph_values[-1][:-1]

    # Process temp_data
    temp_values = temp_data.split('][')
    temp_values[0] = temp_values[0][1:]
    temp_values[-1] = temp_values[-1][:-1]

    # Process ldr_data
    ldr_values = ldr_data.split('][')
    ldr_values[0] = ldr_values[0][1:]
    ldr_values[-1] = ldr_values[-1][:-1]

    # Process voc_data
    voc_values = voc_data.split('][')
    voc_values[0] = voc_values[0][1:]
    voc_values[-1] = voc_values[-1][:-1]

    combined_data_list = []

    # Iterate over the pairs and combine values
    for co2_pair, moisture_pair, ph_value, temp_value, ldr_value, voc_value in zip(
        co2_values, moisture_values, ph_values, temp_values, ldr_values, voc_values
    ):
        co2_value = int(co2_pair.split(', ')[1])
        moisture_value = float(moisture_pair.split(', ')[1])
        ph_value = float(ph_value.split(', ')[1])
        temp_value = float(temp_value.split(', ')[1])
        ldr_value = int(ldr_value.split(', ')[1])
        voc_value = int(voc_value.split(', ')[1])
        combined_data_list.append([co2_value, moisture_value, ph_value, temp_value, ldr_value, voc_value])

    # Write individual lists to separate files
    with open("co2.txt", "w") as file:
        file.write("\n".join(str(int(value.split(', ')[1])) for value in co2_values))

    with open("voc.txt", "w") as file:
        file.write("\n".join(str(int(value.split(', ')[1])) for value in voc_values))

    with open("ph.txt", "w") as file:
        file.write("\n".join(str(float(value.split(', ')[1])) for value in ph_values))

    with open("temp.txt", "w") as file:
        file.write("\n".join(str(float(value.split(', ')[1])) for value in temp_values))

    with open("moisture.txt", "w") as file:
        file.write("\n".join(str(float(value.split(', ')[1])) for value in moisture_values))

    with open("ldr.txt", "w") as file:
        file.write("\n".join(str(int(value.split(', ')[1])) for value in ldr_values))

    # Print or use the combined list as needed
    with open("combined_data.txt", "w") as file:
        file.write("\n".join(str(combined) for combined in combined_data_list))

else:
    print("Failed to fetch data from the server")
