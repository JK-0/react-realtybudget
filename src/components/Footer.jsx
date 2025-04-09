// src/components/Footer.jsx
const Footer = () => (
  <footer className="bg-light border-top text-center p-2 fixed-bottom" style={{ height: "40px" }}>
    <small>&copy; {new Date().getFullYear()} RealtyBudget — Admin Panel</small>
</footer>
);

export default Footer;


// // src/components/FooterWithSidebar.jsx
// const FooterWithSidebar = () => {
//     return (
//       <footer className="bg-dark text-white text-center ">
//         <small>&copy; {new Date().getFullYear()} RealtyBudget — Admin Panel</small>
//       </footer>
//     );
//   };
  
//   export default FooterWithSidebar;
  