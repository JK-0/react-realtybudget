import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/auth";
import FooterMenu from "./FooterMenu";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const csrf = document.cookie.split('csrftoken=')[1]?.split(';')[0];

    getUser(token, csrf).then(async res => {
      if (res.status === 200) {
        const data = await res.json();
        setUser(data);
      } else if (res.status === 401) {
        // Logout and redirect to login
        localStorage.clear();
        // Optionally clear cookies here if required
        navigate("/");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <h2>Welcome Home</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <FooterMenu />
    </div>
  );
};

export default Home;
