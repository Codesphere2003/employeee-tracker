
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Employee Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Modern employee attendance tracking with location-based check-ins and real-time monitoring for businesses.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Location Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">GPS-based check-ins ensure employees are at their assigned locations</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Automated time tracking with business hours enforcement</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage multiple employees across different shop locations</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Secure Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Role-based access control for admins and employees</p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Credentials */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Admin Access</h3>
              <p className="text-sm text-blue-700">
                <strong>Email:</strong> admin@company.com<br />
                <strong>Password:</strong> admin123
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Employee Access</h3>
              <p className="text-sm text-green-700">
                <strong>Email:</strong> employee@company.com<br />
                <strong>Password:</strong> employee123
              </p>
            </div>
            <p className="text-center text-gray-600 text-sm">
              Login is only available between 9:00 AM - 5:00 PM
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
