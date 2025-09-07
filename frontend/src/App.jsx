import { useState } from "react"; // React hook for component state
import { useEffect } from "react";
import LocationForm from "./LocationForm";
import MapView from "./MapRender";

function App() {

  console.log(1)

  // Store the user’s input in state
  const [locationOne, setLocationOne] = useState("");
  const [locationTwo, setLocationTwo] = useState("");
  const [midwayCoordsLat, setMidwayCoordsLat] = useState("");
  const [midwayCoordsLon, setMidwayCoordsLon] = useState("");
  const [placeName, setPlaceName] = useState("");

  // Store the response message from the backend
  const [response, setResponse] = useState("");

  console.log(2)

  const locations = {
    locationOne,
    locationTwo,
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on submit
    console.log(6) //
    const fetchCoords = async (place) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}`,
        { headers: { "User-Agent": "your-app-name" } }
      );
      console.log(8)
      const data = await res.json();
      console.log(9)
      return data.length > 0
        ? { lat: data[0].lat, lon: data[0].lon }
        : { lat: null, lon: null };
    };

    console.log(7)
    console.log("locations");
    console.log(locations);

    const coords = {
      locationOne: await fetchCoords(locations["locationOne"]),
      locationTwo: await fetchCoords(locations["locationTwo"]),
    };

    console.log("coords");
    console.log(coords);

    console.log(
      "Coordinates found:",
      coords["locationOne"],
      coords["locationTwo"]
    );

    console.log("placeName")
    console.log(placeName)

    console.log(10)
    // Send a POST request to the Flask backend
    const res = await fetch("http://127.0.0.1:5000/submit", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Tells backend it's JSON
      },
      body: JSON.stringify({ locations, coords, placeName }), // Convert state to JSON string
    });

    console.log(11)

    // Wait for and extract the JSON response
    const data = await res.json();
    console.log("data")
    console.log(data)

    console.log(12)
    // this is what your sending to the backend looks like
    console.log("JSON.stringify({ locations, coords }, null, 2)");
    console.log(JSON.stringify({ locations, coords }, null, 2));

    console.log(13)
    // Store the response message in component state
    console.log("setResponse(data.response)")
    setResponse(data.response);

    console.log("data");
    console.log(data);

    console.log(14)
    console.log("data.midway_coords");
    console.log(data.midway_coords);
    midwayCoords(data.midway_coords);

    //data is the backend, message is this line here in backend, return jsonify({"message": f"You have selected {locations["locationOne"]} and {locations["locationTwo"]}"})
  };

  const fetchPlaceName = async (lat, lon) => {
    console.log(16)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { headers: { "User-Agent": "your-app-name" } }
    );
    console.log("res")
    console.log(res)
    console.log(17)
    const data = await res.json();
    console.log("data.display_name")
    console.log(data.display_name)
    return data.display_name; // Place name string
  };

  console.log(3)
  function midwayCoords(midwayCoords) {
    console.log(15)
    setMidwayCoordsLat(midwayCoords["latitude"]);
    setMidwayCoordsLon(midwayCoords["longitude"]);
    // fetchPlaceName(setMidwayCoordsLat, setMidwayCoordsLon);
  }

  // Usage
  useEffect(() => {
    if (midwayCoordsLat && midwayCoordsLon) {
      fetchPlaceName(midwayCoordsLat, midwayCoordsLon).then((name) => {
        if (name === undefined) {
          console.log(20)
          console.log("You are in the sea");
        } else {
          console.log(20)
          console.log("Place name:", name);
          setPlaceName(name);
        }
      });
    }
  }, [midwayCoordsLat, midwayCoordsLon]);

  console.log(4)
  console.log("Sending to backend:", locations);
  console.log("↑ setLocationOne & setLocationTwo (states) are populating locationOne & locationTwo by the input from the user (each time a letter is typed) in the form on screen...The form which is in the LocationForm.jsx file")

  // Return JSX to render the form and response message
  return (
    <>
      <LocationForm
        locationOne={locationOne}
        setLocationOne={setLocationOne}
        locationTwo={locationTwo}
        setLocationTwo={setLocationTwo}
        handleSubmit={handleSubmit}
        response={response}
        placeName={placeName}
      />
      {midwayCoordsLat && midwayCoordsLon && (
        <MapView
          lat={midwayCoordsLat}
          lon={midwayCoordsLon}
          placeName={placeName}
        />
      )}
    </>
  );
}

export default App; // Make the component available to use elsewhere
