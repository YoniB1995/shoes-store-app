import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "./Routing/Route";
import Navbar from "./components/Feauters/NavBar/Navbar";
import { ContextProvider } from "./components/context";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const _user = jwt.verify(token, "eliasadmaso");
      setUser(_user);
    }
  }, []);

  return (
    <ContextProvider value={{ user }}>
    <Router>
      <Navbar />
      <Route />
    </Router>
    // </ContextProvider>
  );
}

export default App;
