import '../Styles/table.css';
import heartEmpty from '../assets/heart-empty.png';
import heartFilled from '../assets/heart.png';

const TableRow = (song) => {
  console.log("song item", song)
  return (
     <tr key = {song.data.Id}>
        <td>{song.data.name}</td>
        <td>{song.data.artistName}</td>
        <td><img src={heartEmpty} alt="heart icon" style={{ width: '20px', height: '20px' }}/></td>
      </tr>
  );
}

export default TableRow;

