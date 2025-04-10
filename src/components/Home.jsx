// src/components/Home.jsx
import FooterMenu from "./FooterMenu";
import useAuthGuard from "../hooks/useAuthGuard";

const Home = () => {

  const user = useAuthGuard();
  if (!user) return null;

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
