import React, { useState } from "react";
import Axios from 'axios';
import './App.css';

function App() {
  const [joke, setJoke] = useState("");

  const getJoke = () => {
    Axios.get("https://official-joke-api.appspot.com/random_joke").then(
      (response) => {
        //setJoke(response.data.setup + " ... " + response.data.punchline); // displays random joke
        setJoke("Hello World!") // default response?
        }
    );
  };
  
  return (
    <div className="App">
      <header className="App-header">
        Test <button onClick={getJoke}>Click</button>
        {joke}
      </header>
    </div>
  );
}

export default App;
