const LocationForm = ({
  locationOne,
  setLocationOne, 
  locationTwo, 
  setLocationTwo, 
  handleSubmit,
  response,
  placeName
}) => {
  return (
    <div>
      <h1 style={{color: "green"}}>Equidistance Scout</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Location one: </label>
        <input
          type="text"
          value={locationOne}
          onChange={(e) => setLocationOne(e.target.value)}
          placeholder="Enter a location"
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

      {response && <p>{response}</p>}
      {placeName && <p>The midway location between {locationOne} & {locationTwo} is:<br/>{placeName}</p>}
    </div>
  );
};

export default LocationForm;
