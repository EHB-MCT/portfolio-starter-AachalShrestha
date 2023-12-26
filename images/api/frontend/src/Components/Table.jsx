import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./TableRow";

const Table = ({ url, favorites }) => {
  const [tableData, setTableData] = useState([]);
  const [favSongs, setFavSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUserData = sessionStorage.getItem("user");
  const user = storedUserData ? JSON.parse(storedUserData) : null;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}`);
      const songs = response.data.data;
      try {
        //THZE ERROR
        if (user) {
          const resp = await axios.get(
            `http://localhost:3000/users/${user.id}/favorite-songs`
          );
          setFavSongs(resp.data.data);
        }
        const artistPromises = songs.map(async (song) => {
          if (song.artist_id) {
            const artistResponse = await axios.get(
              `http://localhost:3000/artists/${song.artist_id}`
            );
            return {
              ...song,
              artistName: artistResponse.data.data[0].name,
            };
          } else {
            return {
              ...song,
              artistName: null,
            };
          }
        });

        const songsWithArtistNames = await Promise.all(artistPromises);
        setTableData(songsWithArtistNames);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Add to favorites</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tableData) && tableData.length > 0 ? (
            tableData.map((item) => (
              <TableRow
                song={item}
                isFavorite={favSongs.some(
                  (favSong) => favSong.name === item.name
                )}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
