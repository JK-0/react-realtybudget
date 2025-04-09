// src/components/MainLayout.jsx
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* Fixed Header */}
      <Header />

      <div className="container-fluid">
        <div className="row">
          {/* Fixed Sidebar */}
          <div
            className="col-auto bg-light border-end vh-100 p-0"
            style={{
              width: "200px",
              position: "fixed",
              top: "56px", // height of header
              bottom: "40px", // height of footer
              zIndex: 1030,
            }}
          >
            <Sidebar />
          </div>

          {/* Scrollable Main Content */}
          <div
            className="col"
            style={{
              marginLeft: "200px", // sidebar width
              paddingTop: "56px", // header height
              paddingBottom: "40px", // footer height
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <div className="container py-3">{children}</div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
