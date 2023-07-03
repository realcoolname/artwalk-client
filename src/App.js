import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProviderWrapper } from "./context/auth.context";

import "./App.css";

import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import EventsListPage from "./pages/EventsListPage";
import VenuesListPage from "./pages/VenuesListPage";

import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <AuthProviderWrapper>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/events" element={<EventsListPage />} />
          <Route exact path="/venues" element={<VenuesListPage />} />
        </Routes>
      </AuthProviderWrapper>
    </div>
  );
}

export default App;
