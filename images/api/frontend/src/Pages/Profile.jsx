import React from "react";
import Navigation from "../Components/Nav";
import Table from "../Components/Table";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const navigator = useNavigate();
  const storedUserData = sessionStorage.getItem("user");
  const user = storedUserData ? JSON.parse(storedUserData) : null;
  const logOut = () => {
    sessionStorage.clear();
    navigator("/login");
  };
  return (
    <div className="App">
      <Navigation />
      <h1>
        My favorite
        <br />
        music
      </h1>
      <Table
        url={`http://localhost:3000/users/${user.id}/favorite-songs`}
        favorites={true}
      />
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Profile;
