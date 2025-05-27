
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, LogIn, UserPlus } from 'lucide-react';

const Navigation = ({ onLoginClick, onRegisterClick, currentUser, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Employee Tracker</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Welcome, {currentUser.name}
                </span>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={onLoginClick}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" onClick={onRegisterClick}>
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
