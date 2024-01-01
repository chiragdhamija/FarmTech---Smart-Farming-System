import matplotlib.pyplot as plt
import seaborn as sns

# Read data from the text file
with open("voc.txt", "r") as file:
    lines = file.readlines()

# Extract CO2 readings (ignoring -1)
co2_readings = [float(line.strip()) for line in lines if float(line.strip()) >= 0]

# Create a density plot
sns.histplot(co2_readings, kde=True, color='blue', bins=20)
plt.title('Density Plot of VOC Readings')
plt.xlabel('VOC Reading')
plt.ylabel('VOC')
plt.grid(True)
plt.show()
