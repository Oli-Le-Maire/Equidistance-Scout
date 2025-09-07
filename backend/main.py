from flask import Flask, request, jsonify  # Import Flask tools
from flask_cors import CORS  # Allows communication from React (different port)

app = Flask(__name__)  # Create a Flask web app instance
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for all routes

# Define an API endpoint that accepts POST requests at the "/submit" route
@app.route('/submit', methods=['POST'])
def handle_submit():
    # Get JSON data sent from the React frontend
    data = request.get_json()
    print("data")
    print(data)
    
    # Extract the value of the "userInput" field from the received JSON
    locations = data.get("locations")
    print("locations")
    print(locations)

    coords = data.get("coords")
    place_name = data.get("placeName")
    
    # Print it to the terminal (optional - good for debugging)
    print(f"Received from frontend: {locations} ")
    
    # Send a JSON response back to the frontend
    return jsonify({
        "response": f"The midway coordinates are Latitude: {find_midway_coordinates(coords)[0]}, Longitude: {find_midway_coordinates(coords)[2]}",
        "midway_coords": {"latitude": find_midway_coordinates(coords)[0], "longitude": find_midway_coordinates(coords)[2]},
        "place_name": "${placeName}"
    })

def find_midway_coordinates(coords):
    mid_coords_lat = (float(coords["locationOne"]["lat"]) + float(coords["locationTwo"]["lat"])) / 2
    mid_coords_lon = (float(coords["locationOne"]["lon"]) + float(coords["locationTwo"]["lon"])) / 2  
    mid_coords = [mid_coords_lat, " ", mid_coords_lon]
    return mid_coords

# Start the Flask development server if the file is run directly
if __name__ == '__main__':
    app.run(debug=True)  # Runs at http://127.0.0.1:5000
