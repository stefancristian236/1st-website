import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [colour1, setColour1] = useState("black");
  const [colour2, setColour2] = useState("black");
  const [colour3, setColour3] = useState("black");
  const [catImages, setCatImages] = useState<{ id: string; url: string }[]>([]);
  const [location, setLocation] = useState<{
    country: string;
    regionName: string;
    city: string;
    lat: number;
    lon: number;
    [key: string]: any;
  } | null>(null);

  const array_of_colours = ["magenta", "purple", "pink", "red", "yellow", "blue", "green"];

  const fetchCatImages = async () => {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1&api_key=live_q7Ruf33XuIE0beXb3IQAXLC7NTPy3mJREc8DiAteG3BwuWa3uBQdSziL5YmIcOlW");
      const data = await response.json();
      setCatImages(data);
    } catch (error) {
      console.error("Failed to load cat images", error);
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await fetch("http://ip-api.com/json/");
      const data = await response.json();
      setLocation(data);
    } catch (error) {
      console.error("Failed to load location", error);
    }
  };

  const changeBackground1 = () => {
    setColour1("green");
  };

  const changeBackground2 = () => {
    setColour2(array_of_colours[count % array_of_colours.length]);
    setCount(count + 1);
  };

  const changeBackground3 = () => {
    setColour3(array_of_colours[Math.floor(Math.random() * array_of_colours.length)]);
  };

  return (
    <>
      <h1>Stefan</h1>

      <button onClick={changeBackground1} style={{ backgroundColor: colour1 }}>Change colour to green</button>
      <button onClick={changeBackground2} style={{ backgroundColor: colour2 }}>Change colours from an array</button>
      <button onClick={changeBackground3} style={{ backgroundColor: colour3 }}>Change colours from an array randomly</button>
      <button onClick={fetchCatImages}>Press for cat images</button>
      <button onClick={fetchLocation}>Location</button>

      <div>
        {location && (
          <>
            <p>Country: {location.country}</p>
            <p>Region: {location.regionName}</p>
            <p>City: {location.city} ({location.lat}, {location.lon})</p>
          </>
        )}
      </div>
      
      <div>
        {catImages.map((cat) => (
          <img key={cat.id} src={cat.url} alt="Cat" style={{ width: "500px", height: "500px" }} />
        ))}
      </div>

    </>
  );
}

export default App;
