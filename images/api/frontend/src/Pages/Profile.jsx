import React from "react";
import Navigation from "../Components/Nav";
import Table from "../Components/Table";

const Profile = () => {
  const storedUserData = sessionStorage.getItem("user");
  const user = storedUserData ? JSON.parse(storedUserData) : null;
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
    </div>
  );
};

export default Profile;
