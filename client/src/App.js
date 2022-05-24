import { BrowserRouter, Route, Routes } from "react-router-dom";
import { React, useState } from 'react';
import { UserContext } from "./userContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Header";
import SignIn from "./components/Login";
import SignUp from "./components/Register";
import Profile from "./components/Profile";
import BoxViewPage from './components/BoxViewPage';
import Logout from "./components/Logout";
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
                <Route path="/" exact element={<BoxViewPage admin={false} />}></Route>
                <Route path="/admin" exact element={<BoxViewPage admin={true} />}></Route>
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
