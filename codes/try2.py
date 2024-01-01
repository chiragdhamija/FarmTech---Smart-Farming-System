import os

# Read data from the text file
with open('combined_data.txt', 'r') as file:
    data_lines = file.readlines()

# Clean and format the data as a list of lists
data_2d_array = []
for line in data_lines:
    # Remove leading and trailing whitespaces
    line = line.strip()
    
    # Skip empty lines
    if not line:
        continue

    # Split the line by whitespace
    values = line.replace('[', '').replace(']', '').split(',')
    
    # Convert values to float (except the last element)
    row = [float(value) if i < len(values) - 1 else int(value) for i, value in enumerate(values)]
    
    # Append the row to the 2D array
    data_2d_array.append(row)

# Print the resulting 2D array
print(data_2d_array)

# Write the formatted data to a new text file
with open('esw.txt', 'w') as output_file:
    for row in data_2d_array:
        output_file.write(str(row) + ',\n')

# Remove the trailing comma from the last line
with open('esw.txt', 'rb+') as file:
    file.seek(-2, os.SEEK_END)
    file.truncate()

