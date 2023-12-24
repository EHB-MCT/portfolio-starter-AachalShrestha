import '../Styles/table.css';

const TableRow = (song) => {
  console.log("song item", song)
  return (
     <tr key = {song.data.Id}>
        <td>{song.data.name}</td>
        <td>{song.data.artistName}</td>
        <td>@john_doe</td>
      </tr>
  );
}

export default TableRow;