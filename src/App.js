import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Route, Routes, NavLink, Link } from 'react-router-dom'

import Homepage from "./pages/Homepage";
import EventsListPage from "./pages/EventsListPage";
import VenuesListPage from "./pages/VenuesListPage";

import VenueCard from "./components/VenueCard";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";
import Carousel from "./components/Caroussel";
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import UpdateEventForm from "./components/UpdateEventForm"


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/events" element={<EventsListPage />} />
        <Route exact path="/venues" element={<VenuesListPage />} />
      </Routes>
    </div>
  );
}

export default App;
