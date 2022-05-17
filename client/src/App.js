import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import {useState, useEffect} from 'react';
import Header from "./components/Header";
import { UserContext } from "./userContext";
//import Photos from './components/photos';
import SignIn from "./components/Login"
import SignUp from "./components/Register"
import BoxViewPage from './components/BoxViewPage';

function App() {

  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  return (
    <BrowserRouter>
    <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="Spletni portal"></Header>
          <Routes>
            <Route path="/" exact element={<BoxViewPage />}></Route>
            <Route path="/login" exact element={<SignIn />}></Route>
            <Route path="/register" exact element={<SignUp />}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
