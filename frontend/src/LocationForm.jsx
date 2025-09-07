const LocationForm = ({
  locationOne,
  setLocationOne, 
  locationTwo, 
  setLocationTwo, 
  handleSubmit,
  response,
  placeName
}) => {
  console.log(5)
  return (
    <div>
      <h1 style={{color: "green"}}>Equidistance Scout</h1>

      {/* Form for user input */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Location one: </label>
        <input
          type="text"
          value={locationOne} // Controlled input tied to state
          onChange={(e) => setLocationOne(e.target.value)} // Update state on change
          placeholder="Enter a location" // Placeholder text
        />
        <br />
        <label htmlFor="text">Location two: </label>
        <input
          type="text"
          value={locationTwo}
          onChange={(e) => setLocationTwo(e.target.value)}
          placeholder="Enter a 2nd location"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Show the response once received */}
      {response && <p>{response}</p>}
      {placeName && <p>{placeName}</p>}
    </div>
  );
};

export default LocationForm;
