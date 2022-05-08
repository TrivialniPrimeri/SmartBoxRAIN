import { BrowserRouter, Route, Routes } from "react-router-dom";
//import {useState, useEffect} from 'react';
import Header from "./components/Header";
//import Photos from './components/photos';

function App() {
  //const [photos, setPhotos] = useState([]);
  /*   useEffect(function(){
    const getPhotos = async function(){
      const res = await fetch('http://localhost:3001/photos')
      const data = await res.json();
      console.log(data);
      setPhotos(data);
    };
    getPhotos(); //tak se klice api
  }, []); */
  return (
      <div className="App">
            <Header name="Trivialci" />
            {/* <Photos photos={photos}/> */}
      </div>
  );
}

export default App;
