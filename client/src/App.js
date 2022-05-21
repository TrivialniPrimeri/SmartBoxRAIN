import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { useState } from 'react';
import Header from "./components/Header";
import { UserContext } from "./userContext";
//import Photos from './components/photos';
import SignIn from "./components/Login";
import SignUp from "./components/Register";
import Profile from "./components/Profile";
import BoxViewPage from './components/BoxViewPage';
import Logout from "./components/Logout";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BoxViewSingle from "./components/BoxViewSingle";

function App() {

  const [theme, setTheme] = useState(
    createTheme({
    palette: {
      mode: localStorage.theme ? JSON.parse(localStorage.theme) : "light"
    },
  })
  );

  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  window.addEventListener("themeUpdate",(e) => {
    setTheme(createTheme({
      palette: {
        mode: localStorage.theme ? JSON.parse(localStorage.theme) : "light"
      },
    }));
 });

  return (
      <BrowserRouter>
      <UserContext.Provider value={{
          user: user,
          setUserContext: updateUserData
        }}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <div className="App">
              <Header title="Spletni portal"></Header>
              <Routes>
                <Route path="/" exact element={<BoxViewPage />}></Route>
                <Route path="/login" exact element={<SignIn />}></Route>
                <Route path="/register" exact element={<SignUp />}></Route>
                <Route path="/profile" exact element={<Profile/>}></Route>
                <Route path="/logout" exact element={<Logout />}></Route>
                <Route path="/box/:id" exact element={<BoxViewSingle />}></Route>
              </Routes>
            </div>
          </ThemeProvider>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
