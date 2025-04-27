import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-800 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-teal-600 dark:text-teal-400 flex items-center">
            <span className="mr-2">WanderRest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Home
            </Link>
            <Link to="/rooms" className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Rooms
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link to="/booking" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors">
              Book Now
            </Link>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/account" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <User size={20} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-6 space-y-4 animate-fadeIn">
            <Link to="/" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400">
              Home
            </Link>
            <Link to="/rooms" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400">
              Rooms
            </Link>
            <Link to="/about" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400">
              About
            </Link>
            <Link to="/account" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400">
              My Account
            </Link>
            <Link to="/booking" className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors">
              Book Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;