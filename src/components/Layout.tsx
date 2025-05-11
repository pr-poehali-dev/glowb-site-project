
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 star-bg opacity-30 z-0"></div>
      
      {/* Floating bubbles */}
      <div className="fixed top-20 left-10 w-24 h-24 rounded-full bg-glowb-blue opacity-20 animate-float-slow z-0"></div>
      <div className="fixed top-40 right-20 w-16 h-16 rounded-full bg-glowb-pink opacity-20 animate-float z-0"></div>
      <div className="fixed bottom-20 left-1/4 w-20 h-20 rounded-full bg-glowb-blue-deep opacity-20 animate-float-slower z-0"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-4 md:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
