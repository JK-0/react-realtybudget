// src/components/Footer.jsx
const Footer = () => (
  <footer className="bg-light border-top text-center p-2 fixed-bottom" style={{ height: "40px" }}>
    <small>&copy; {new Date().getFullYear()} RealtyBudget — Admin Panel</small>
</footer>
);

export default Footer;