import "../Styles/home.css";
import { BrowserRouter as Route, Router, Routes } from "react-router-dom";

import Navigation from "../Components/Nav";
import AddSongForm from "../Components/AddSongForm";
import AddArtistForm from "../Components/AddArtistForm";
import Table from "../Components/Table";

const App = () => {
  const storedUserData = sessionStorage.getItem("user");
  const user = storedUserData ? JSON.parse(storedUserData) : null;
  return (
    <div className="App">
      <Navigation />
      <h1>
        Discover
        <br />
        new music
      </h1>
      <AddArtistForm />
      <AddSongForm />
      <Table url="http://localhost:3000/songs" favorites={false} />
    </div>
  );
};

export default App;
