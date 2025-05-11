
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, Image, Home, Settings } from 'lucide-react';
import Icon from "@/components/ui/icon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Photos', path: '/photos', icon: 'Image' },
    { name: 'Music', path: '/music', icon: 'Music' },
    { name: 'Admin', path: '/admin', icon: 'Settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="glass-effect p-4 mb-8 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-playfair text-2xl font-bold text-glowb-blue-deep mr-1">GLOWB</span>
          <span className="font-mono text-xl">.exe</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center hover-glow px-3 py-2 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-glowb-blue bg-opacity-30 font-semibold'
                  : 'hover:bg-glowb-blue hover:bg-opacity-20'
              }`}
            >
              <Icon name={item.icon} className="mr-2 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="hover-glow rounded-full p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-effect mt-2 rounded-lg animate-fade-in z-50">
          <div className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-2 rounded-lg ${
                  isActive(item.path)
                    ? 'bg-glowb-blue bg-opacity-30 font-semibold'
                    : 'hover:bg-glowb-blue hover:bg-opacity-20'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon name={item.icon} className="mr-2 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
