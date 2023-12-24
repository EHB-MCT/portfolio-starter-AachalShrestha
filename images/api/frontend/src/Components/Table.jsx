import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

const Table = ({ url }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}`);
        const songs = response.data.data;

        // Create an array to store promises for fetching artist names
        const artistPromises = songs.map(async (song) => {
          if(song.artist_id){
            const artistResponse = await axios.get(`http://localhost:3000/artists/${song.artist_id}`);
            console.log(artistResponse)
            return {
              ...song,
              artistName: artistResponse.data.data[0].name,
            };
          }else{
            return {
              ...song,
              artistName: null,
            };
          }
        });

        // Wait for all promises to resolve
        const songsWithArtistNames = await Promise.all(artistPromises);

        setTableData(songsWithArtistNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className='table-container'>
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
            tableData.map((item, index) => (
              <TableRow key={index} data={item} />
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
