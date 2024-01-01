import requests
from datetime import datetime, timedelta
import os


def get_data_from_server():
    # Specify the URL of the server endpoint
    server_url = 'http://192.168.1.102/data'

    # Make a GET request to the server
    response = requests.get(server_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        return response.text
    else:
        # Print an error message if the request was not successful
        print(
            f"Error: Unable to fetch data from the server (Status Code: {response.status_code})")
        return None


def save_data_to_file(data, file_path):
    # Save the received data to a local file
    with open(file_path, 'w') as file:
        file.write(data)
    print(f"Data saved to {file_path}")


def main():
    # Set the file path where data will be saved
    backup_folder = 'backups'
    os.makedirs(backup_folder, exist_ok=True)

    # Generate a timestamped file name for the backup
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    file_name = f'data_backup_{timestamp}.txt'
    file_path = os.path.join(backup_folder, file_name)

    # Get data from the server
    data = get_data_from_server()

    if data:
        # Save the data to a local file
        save_data_to_file(data, file_path)


if __name__ == '__main__':
    main()
