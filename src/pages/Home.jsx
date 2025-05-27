
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users, Shield, BarChart3, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Employee Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Modern location-based employee attendance system with real-time tracking and comprehensive reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Location-Based Check-in</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Employees can only check in when they're within the designated shop location radius.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Time Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track working hours, break times, and overtime with precise timestamp recording.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-10 h-10 text-purple-600 mb-2" />
                <CardTitle>Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive employee profiles with shop assignments and attendance history.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-10 h-10 text-red-600 mb-2" />
                <CardTitle>Admin Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Full administrative dashboard with employee oversight and attendance monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-yellow-600 mb-2" />
                <CardTitle>Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Live attendance tracking with visual maps and comprehensive reporting tools.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-teal-600 mb-2" />
                <CardTitle>Easy Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Simple setup with intuitive interface for both employees and administrators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Try It Now
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience the system with our demo accounts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Admin Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">Email: admin@company.com</p>
                <p className="font-medium">Password: admin123</p>
                <p className="text-sm text-gray-500">Full dashboard access</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Employee Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">Email: employee@company.com</p>
                <p className="font-medium">Password: employee123</p>
                <p className="text-sm text-gray-500">Employee dashboard</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
