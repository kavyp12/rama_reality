import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const popularChoices = [
  { label: "Ready To Move", slug: "ready-to-move" },
  { label: "Possession within 1 year", slug: "possession-within-1-year" },
  { label: "Possession within 2 year", slug: "possession-within-2-year" },
  { label: "Possession in More than 2 Years", slug: "possession-more-than-2-years" },
  { label: "New Launch Projects", slug: "new-launch-projects" },
];

const propertyTypes = [
  { label: "Flat in Ahmedabad", slug: "flat-in-ahmedabad" },
  { label: "House for sale in Ahmedabad", slug: "house-in-ahmedabad" },
  { label: "Villa in Ahmedabad", slug: "villa-in-ahmedabad" },
  { label: "Weekend home in Ahmedabad", slug: "weekend-home-in-ahmedabad" },
  { label: "Penthouse for sale in Ahmedabad", slug: "penthouse-in-ahmedabad" },
  { label: "Duplex for sale in Ahmedabad", slug: "duplex-in-ahmedabad" },
];

const budgets = [
  { label: "Under 50 Lac", slug: "under-50-lac" },
  { label: "50 Lac to 75 Lac", slug: "50-lac-to-75-lac" },
  { label: "75 Lac to 1.25 Cr", slug: "75-lac-to-1-25-cr" },
  { label: "1.25 Cr to 2 Cr", slug: "1-25-cr-to-2-cr" },
  { label: "2 Cr to 3 Cr", slug: "2-cr-to-3-cr" },
  { label: "3 Cr to 5 Cr", slug: "3-cr-to-5-cr" },
  { label: "5 Cr+", slug: "5-cr-plus" },
];

const PRIMARY = "#4299E1";

const Navbar = () => {
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Hide on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 100) {
        setIsVisible(false);
      } else if (y < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* ✅ NAVBAR */}
      <nav
        className={`w-full bg-white text-gray-900 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto max-w-screen-2xl px-4 py-3 flex items-center justify-between">

          {/* ✅ LOGO */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-extrabold">
            <span className="text-blue-500">RAMA</span>
            <span className="text-red-500">REALTY</span>
          </Link>

          {/* ✅ CENTER LINKS (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">

            {/* ✅ BUY DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setIsBuyDropdownOpen(!isBuyDropdownOpen)}
                className="flex items-center text-[15px] font-medium text-gray-700 hover:text-gray-900"
              >
                Buy <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {isBuyDropdownOpen && (
                <div className="absolute top-full left-0 mt-4 w-[800px] bg-white shadow-xl rounded-lg p-6 border">
                  <div className="grid grid-cols-3 gap-8">

                    {/* Popular */}
                    <div>
                      <h3 className="font-bold text-[17px] mb-3">Popular Choices</h3>
                      {popularChoices.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/buy/${item.slug}`}
                          className="block py-1 px-2 text-gray-600 hover:bg-gray-100 rounded"
                          onClick={() => setIsBuyDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Types */}
                    <div>
                      <h3 className="font-bold text-[17px] mb-3">Property Type</h3>
                      {propertyTypes.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/buy/${item.slug}`}
                          className="block py-1 px-2 text-gray-600 hover:bg-gray-100 rounded"
                          onClick={() => setIsBuyDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Budget */}
                    <div>
                      <h3 className="font-bold text-[17px] mb-3">Budget</h3>
                      {budgets.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/buy/${item.slug}`}
                          className="block py-1 px-2 text-gray-600 hover:bg-gray-100 rounded"
                          onClick={() => setIsBuyDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Other Links */}
            <Link className="text-[15px] font-medium hover:text-gray-900" to="/buy/all">All Properties</Link>
            {["Sell", "Explore", "New Projects"].map((i) => (
              <a key={i} className="text-[15px] font-medium hover:text-gray-900">{i}</a>
            ))}
          </div>

          {/* ✅ RIGHT DESKTOP BUTTONS */}
          <div className="hidden lg:flex items-center space-x-5">
            <a className="text-[15px] font-semibold" style={{ color: PRIMARY }}>myReality</a>
            <a className="rounded-lg px-4 py-2 text-white" style={{ backgroundColor: PRIMARY }}>
              Sign up or Log in
            </a>
          </div>

          {/* ✅ MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 border rounded-lg">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ MOBILE MENU FULL SCREEN */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-white shadow-xl z-40 px-5 py-4">

          {/* ✅ Buy Dropdown */}
          <div className="mb-4">
            <button
              onClick={() => setIsBuyDropdownOpen(!isBuyDropdownOpen)}
              className="flex justify-between w-full text-[16px] font-semibold py-2"
            >
              Buy <ChevronDown />
            </button>

            {isBuyDropdownOpen && (
              <div className="pl-4 space-y-1">

                <p className="font-bold mt-2">Popular Choices</p>
                {popularChoices.map((i) => (
                  <Link key={i.slug} to={`/buy/${i.slug}`} className="block py-1 text-gray-600">
                    {i.label}
                  </Link>
                ))}

                <p className="font-bold mt-3">Property Types</p>
                {propertyTypes.map((i) => (
                  <Link key={i.slug} to={`/buy/${i.slug}`} className="block py-1 text-gray-600">
                    {i.label}
                  </Link>
                ))}

                <p className="font-bold mt-3">Budget</p>
                {budgets.map((i) => (
                  <Link key={i.slug} to={`/buy/${i.slug}`} className="block py-1 text-gray-600">
                    {i.label}
                  </Link>
                ))}

              </div>
            )}
          </div>

          {/* ✅ Other mobile links */}
          <Link className="block py-2" to="/buy/all">All Properties</Link>
          <a className="block py-2">Sell</a>
          <a className="block py-2">Explore</a>
          <a className="block py-2">New Projects</a>

          <hr className="my-3" />

          {/* ✅ Buttons */}
          <a className="block py-2 font-semibold" style={{ color: PRIMARY }}>myReality</a>
          <a className="block py-2 rounded-lg text-center text-white" style={{ background: PRIMARY }}>
            Sign up or Log in
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
