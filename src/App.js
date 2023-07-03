import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext, AuthProviderWrapper } from "./context/auth.context";
import { useContext, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import EventsListPage from "./pages/EventsListPage";
import VenuesListPage from "./pages/VenuesListPage";
import NavBar from "./components/Navbar";

function App() {

  const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className="App">
        <NavBar   
            isLoggedIn={isLoggedIn} 
            />

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/events" element={<EventsListPage />} />
          <Route exact path="/venues" element={<VenuesListPage />} />
        </Routes>
     
    </div>
  );
}

export default App;
