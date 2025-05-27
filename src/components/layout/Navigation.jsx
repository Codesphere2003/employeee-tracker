
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, LogIn, UserPlus } from 'lucide-react';

const Navigation = ({ onLoginClick, onRegisterClick, currentUser, onLogout, onNavigate }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>
            <MapPin className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Employee Tracker</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('features')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Features
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('about')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
            >
              About
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('contact')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Contact
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 font-medium">
                  Welcome, {currentUser.name}
                </span>
                <Button variant="outline" size="sm" onClick={onLogout} className="hover:bg-red-50 hover:text-red-600 hover:border-red-300">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={onLoginClick} className="hover:bg-blue-50 hover:text-blue-600">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" onClick={onRegisterClick} className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
