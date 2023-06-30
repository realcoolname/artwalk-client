import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Route, Routes, NavLink, Link } from 'react-router-dom'

import Homepage from "./pages/Homepage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EventsListPage from "./pages/EventsListPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import VenuesListPage from "./pages/VenuesListPage";

import VenueCard from "./components/VenueCard";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/events" element={<EventsListPage />} />
        <Route exact path="/events/:eventId" element={<EventDetailsPage />} />
        <Route exact path="/events/login" element={<LogInPage />} />
        <Route exact path="/events/signup" element={<SignUpPage />} />
        <Route exact path="/venues" element={<VenuesListPage />} />
        <Route exact path="/venues/:venueId" element={<VenueDetailsPage />} />
        <Route exact path="/events/update/:eventId" element={<UpdateEventPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
