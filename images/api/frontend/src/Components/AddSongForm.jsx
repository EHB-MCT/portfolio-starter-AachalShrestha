import "../Styles/addSong.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSongForm = () => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [message, setMessage] = useState("");

  const handleAddSong = async () => {
    try {
      const response = await fetch("http://localhost:3000/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          artist: artist,
        }),
      });

      const data = await response.json();
      setMessage(data.message);

      console.log(data);

      if (response.status == 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };
  return (
    <div className="add-song-form-wrapper">
      <h3>Add song</h3>
      <div className="add-song-form-container">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button onClick={handleAddSong}>Submit</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddSongForm;
