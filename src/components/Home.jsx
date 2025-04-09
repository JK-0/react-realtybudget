import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/auth";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const csrf = document.cookie.split('csrftoken=')[1]?.split(';')[0];

    getUser(token, csrf).then(async res => {
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        navigate("/");
      }
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome Home</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
