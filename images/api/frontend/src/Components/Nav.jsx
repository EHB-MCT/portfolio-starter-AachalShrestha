import '../Styles/nav.css';


const Navigation = () => {
  return (
    <div className="App">
     <div className="Nav">
        <div>
          <p>Welcome</p>
        </div>
        <div>
          <a href='/'><p>Home</p></a>
          <a href='/Profile'><p>Profile</p></a>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
