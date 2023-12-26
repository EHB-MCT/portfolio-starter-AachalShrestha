import '../Styles/table.css';
import React, { useState, useEffect } from 'react';
import heartEmpty from '../assets/heart-empty.png';
import heartFilled from '../assets/heart.png';
import axios from 'axios';

const TableRow = ({song, isFavorite}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorites = async () => {
    const storedUserData = sessionStorage.getItem('user');
    const user = storedUserData ? JSON.parse(storedUserData) : null;
    console.log("clicked ont he heart")
    try {
      const favoriteSongId = song.id;

      if (favorite) {
        console.log(user.id)
        await axios.delete('http://localhost:3000/users/delete-favorite-song', {
          data: { user_id: user.id, favorite_song_id: favoriteSongId },
        });
        console.log("deleted song fromt favs")
      } else {
        await axios.post('http://localhost:3000/users/add-favorite-song', {
          user_id: user.id,
          favorite_song_id: favoriteSongId,
        });
        console.log("add song to favs")
      }

      setFavorite(prevFavorite => !prevFavorite);
      console.log("new fav state", favorite)
      const heartImg = document.getElementById(`heart-${song.id}`);
      if (heartImg) {
        heartImg.src = isFavorite ? heartEmpty : heartFilled;
      }
      
    } catch (error) {
      console.error('Error handling favorites:', error);
    } 
  };

  return (
     <tr key = {song.id}>
        <td>{song.name}</td>
        <td>{song.artistName}</td>
        <td>
          <div>
          <img
            id={`heart-${song.id}`}
            className='heartButton'
            onClick={handleFavorites}
            src={isFavorite ? heartFilled : heartEmpty}
            alt="heart icon"
            style={{ width: '20px', height: '20px' }}
          />
          </div></td>
      </tr>
  );
}

export default TableRow;

