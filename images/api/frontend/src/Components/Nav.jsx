import "../Styles/nav.css";

const Navigation = () => {
  const storedUserData = sessionStorage.getItem("user");
  const user = storedUserData ? JSON.parse(storedUserData) : null;
  console.log(user);
  return (
    <div className="Nav">
      <div>{user ? <p>Welcome, {user.username}</p> : <p>Welcome</p>}</div>
      <div>
        <a href="/">
          <p>Home</p>
        </a>
        {user ? (
          <a href="/Profile">
            <p>Profile</p>
          </a>
        ) : (
          <a href="/login">
            <p>Profile</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default Navigation;
