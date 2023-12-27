import "../Styles/addSong.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSongForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddArtist = async () => {
    try {
      const response = await fetch("http://localhost:3001/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
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
      <h3>Add artist</h3>
      <div className="add-song-form-container">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAddArtist}>Submit</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddSongForm;
