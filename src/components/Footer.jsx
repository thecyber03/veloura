import { Link } from "react-router-dom";
import BrandLogo from '../components/ui/BrandLogo.jsx'

const Footer = () => {
  return (
    <footer className="bg-[#fff] text-[#171717] py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
         <BrandLogo/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold">About Us</h2>
            <p className="text-sm text-gray-400 mt-2">
              We are building a multi-vendor e-commerce platform that empowers small general 
              store owners to create their own stores with a unique identity. Customers can 
              shop directly from their trusted stores, making online shopping more personal 
              and reliable. Our goal is to provide a seamless shopping experience with a 
              modern, user-friendly interface.
            </p>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-lg font-semibold">Skills Used</h2>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-gray-400">Frontend: React, Tailwind CSS, Vite</li>
              <li className="text-sm text-gray-400">State Management: useContext</li>
              <li className="text-sm text-gray-400">Backend: Node.js, Express.js</li>
              <li className="text-sm text-gray-400">Database: MongoDB</li>
              <li className="text-sm text-gray-400">Authentication: Email OTP-based login</li>
              <li className="text-sm text-gray-400">Version Control: Git & GitHub</li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-0">
              <li>
                <Link to="/#" className="text-sm text-gray-400 hover:text-white">
                  Veloura Admin Panel App
                </Link>
              </li>
              <li>
                <Link to="/#" className="text-sm text-gray-400 hover:text-white">
                  Veloura App
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-semibold ">Contact Us</h2>
            <p className="text-sm text-gray-400 mt-2">📧 Email: abdulaziz86723@gmail.com</p>
            <p className="text-sm text-gray-400">🐱 GitHub: <a href="https://github.com/thecyber03" className="hover:text-white"> @thecyber03</a></p>
            <p className="text-sm text-gray-400">📸 Instagram: <a href="https://instagram.com/the_cyber_03" className="hover:text-white">@the_cyber_03</a></p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
          Aziz Ansari © 2025 VELOURA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
