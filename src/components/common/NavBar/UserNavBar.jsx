import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import store from "../../../redux/store";
import { logout } from "../../../redux/auth/actions";
import {
  Sun,
  Moon,
  UserCircle,
  Search,
  CircleDot,
  Menu,
  X,
} from "lucide-react";

export default function MerchantNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#0f2936] border border-white/10 rounded-full p-2 px-4 shadow-inner mt-4 max-w-6xl mx-auto backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Logo and Desktop Navigation */}
        <div className="flex gap-6">
          {/* Logo */}
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-2xl h-6 font-grifter cursor-pointer text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
          >
            SMART
          </h1>

          {/* Desktop Nav Buttons */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className={`text-md font-aeonik transition-all duration-200 relative ${
                isActive("/dashboard")
                  ? "text-cyan-400 font-semibold"
                  : "text-white/80 hover:text-cyan-400"
              }`}
            >
              Dashboard
              {isActive("/dashboard") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className={`text-md font-aeonik transition-all duration-200 relative ${
                isActive("/checkout")
                  ? "text-cyan-400 font-semibold"
                  : "text-white/80 hover:text-cyan-400"
              }`}
            >
              Checkout
              {isActive("/checkout") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        {/* Search - Desktop only */}
        <div className="ml-auto hidden md:flex items-center justify-end">
          <div
            className={`w-full max-w-md flex items-center bg-transparent border rounded-full px-4 py-2 transition-all duration-300 ${
              searchFocused
                ? "border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                : "border-white/20 hover:border-white/30"
            }`}
          >
            <input
              type="text"
              placeholder="Search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 font-aeonik text-md text-white placeholder-white/60"
              style={{ boxShadow: "none" }}
            />
            <Search
              size={16}
              className={`transition-colors duration-300 ${
                searchFocused ? "text-cyan-400" : "text-white"
              }`}
            />
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* User Dropdown - desktop only */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer text-md text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <UserCircle size={22} className="text-cyan-400" />
              <span className="truncate max-w-[120px] font-aeonik">
                {user?.user_metadata.name}
              </span>
            </div>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-40 bg-[#1c1f26] text-white border border-white/10 rounded-lg p-2 shadow-lg z-50 animate-fadeIn"
                style={{
                  animation: "fadeSlideDown 0.2s ease-out",
                }}
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-white/10 rounded transition-colors duration-150"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-cyan-400 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="md:hidden mt-2 bg-[#1c1f26] border border-white/10 rounded-lg p-4 shadow-lg text-md space-y-2 text-white animate-fadeIn"
          style={{
            animation: "fadeSlideDown 0.2s ease-out",
          }}
        >
          <button
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
            className={`block w-full text-left py-2 px-3 rounded transition-all duration-150 ${
              isActive("/dashboard")
                ? "bg-cyan-400/20 text-cyan-400"
                : "hover:bg-white/10"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate("/checkout");
              setMenuOpen(false);
            }}
            className={`block w-full text-left py-2 px-3 rounded transition-all duration-150 ${
              isActive("/checkout")
                ? "bg-cyan-400/20 text-cyan-400"
                : "hover:bg-white/10"
            }`}
          >
            Checkout
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left py-2 px-3 rounded hover:bg-white/10 transition-all duration-150"
          >
            Logout
          </button>
        </div>
      )}

      {/* CSS Animations */}
      {/* <style jsx>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </header>
  );
}