import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;