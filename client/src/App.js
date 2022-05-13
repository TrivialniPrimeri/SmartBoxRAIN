import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, {Component} from "react";
//import {useState, useEffect} from 'react';
import Header from "./components/Header";
//import Photos from './components/photos';
import styled from "styled-components";
import SignIn from "./components/Login"
import SignUp from "./components/Register"

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
function App() {
  return (
      <AppContainer>
        <SignUp/>
      </AppContainer>
  );
}
class Apps extends Component {
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
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <Header name="Trivialci" />
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;