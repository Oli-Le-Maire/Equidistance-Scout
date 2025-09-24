import { useState } from "react";
import { useEffect } from "react";
import LocationForm from "./LocationForm";
import MapView from "./MapRender";

function App() {

  // Store the user’s input in state
  const [locationOne, setLocationOne] = useState("");
  const [locationTwo, setLocationTwo] = useState("");
  const [midwayCoordsLat, setMidwayCoordsLat] = useState("");
  const [midwayCoordsLon, setMidwayCoordsLon] = useState("");
  const [placeName, setPlaceName] = useState("");

  // Store the response message from the backend
  const [response, setResponse] = useState("");

  const locations = {
    locationOne,
    locationTwo,
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on submit
    const fetchCoords = async (place) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}`,
        { headers: { "User-Agent": "your-app-name" } }
      );
      const data = await res.json();
      return data.length > 0
        ? { lat: data[0].lat, lon: data[0].lon }
        : { lat: null, lon: null };
    };

    console.log("locations");
    console.log(locations);

    const coords = {
      locationOne: await fetchCoords(locations["locationOne"]),
      locationTwo: await fetchCoords(locations["locationTwo"]),
    };

    console.log("coords");
    console.log(coords);

    // Send a POST request to the Flask backend
    const res = await fetch("http://127.0.0.1:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tells backend it's JSON
      },
      body: JSON.stringify({ locations, coords }), // Convert state to JSON string
    });

    // Wait for and extract the JSON response
    const data = await res.json();
    console.log("Received back from the backend")
    console.log(data)

    // this is what your sending to the backend looks like
    console.log("Sent to the backend");
    console.log(JSON.stringify({ locations, coords }, null, 2));

    // Store the response message in component state
    setResponse(data.response);

    // call the midwayCoords function with the midway coordinates as an argument
    midwayCoords(data.midway_coords);
  };

  const fetchPlaceName = async (lat, lon) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { headers: { "User-Agent": "your-app-name" } }
    );
    const data = await res.json();
    return data.display_name;
  };

  function midwayCoords(midwayCoords) {
    setMidwayCoordsLat(midwayCoords["latitude"]);
    setMidwayCoordsLon(midwayCoords["longitude"]);
  }

  useEffect(() => {
    if (midwayCoordsLat && midwayCoordsLon) {
      fetchPlaceName(midwayCoordsLat, midwayCoordsLon).then((name) => {
        if (name === undefined) {
          setPlaceName("You are in the sea");
        } else {
          setPlaceName(name);
        }
      });
    }
  }, [midwayCoordsLat, midwayCoordsLon]);

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

export default App;