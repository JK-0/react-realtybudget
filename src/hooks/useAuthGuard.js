import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/api";

const useAuthGuard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const csrf = document.cookie.split("csrftoken=")[1]?.split(";")[0];

    if (!token) {
      navigate("/");
      return;
    }

    getUser(token, csrf).then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        setUser(data);
      } else if (res.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/");
      } else {
        navigate("/");
      }
    });
  }, []);

  return user;
};

export default useAuthGuard;
