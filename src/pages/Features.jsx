
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users, Shield, BarChart3, CheckCircle, Smartphone, Globe, Lock } from 'lucide-react';

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Powerful Features for Modern Workforce Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Employee Tracker offers comprehensive location-based attendance management 
            with real-time monitoring and advanced analytics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="text-center pb-4">
              <MapPin className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <CardTitle className="text-xl text-gray-900">GPS-Based Check-in</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 leading-relaxed">
                Employees can only check in when they're physically present at their assigned 
                shop location, ensuring accurate attendance tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="text-center pb-4">
              <Clock className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <CardTitle className="text-xl text-gray-900">Real-Time Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 leading-relaxed">
                Monitor employee attendance in real-time with precise timestamps and 
                automatic calculation of working hours and overtime.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="text-center pb-4">
              <Users className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
              <CardTitle className="text-xl text-gray-900">Employee Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 leading-relaxed">
                Comprehensive employee profiles with shop assignments, role management, 
                and detailed attendance history tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-red-50 to-white">
            <CardHeader className="text-center pb-4">
              <Shield className="w-12 h-12 text-red-600 mb-4 mx-auto" />
              <CardTitle className="text-xl text-gray-900">Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 leading-relaxed">
                Full administrative control with employee oversight, attendance monitoring, 
                and comprehensive reporting capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-white">
            <CardHeader className="text-center pb-4">
              <BarChart3 className="w-12 h-12 text-yellow-600 mb-4 mx-auto" />
              <CardTitle className="text-xl text-gray-900">Analytics & Reports</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 leading-relaxed">
                Advanced analytics with visual maps, attendance trends, and 
                exportable reports for payroll and HR management.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-teal-50 to-white">
            <CardHeader className="text-center pb-4">
              <Smartphone className="w-12 h-12 text-teal-600 mb-4 mx-auto" />
              <CardTitle className="text-xl text-gray-900">Mobile Friendly</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 leading-relaxed">
                Responsive design works perfectly on all devices, allowing employees 
                to check in from their smartphones or tablets.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Employee Tracker?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Geofencing Technology</h3>
                  <p className="text-gray-600">
                    Advanced geofencing ensures employees can only check in within designated areas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Interactive Maps</h3>
                  <p className="text-gray-600">
                    Visual representation of all locations and employee check-ins on interactive maps.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Lock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
                  <p className="text-gray-600">
                    Enterprise-grade security with encrypted data and privacy-focused design.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <BarChart3 className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
                  <p className="text-gray-600">
                    Comprehensive reports and analytics to optimize workforce management.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Location Support</h3>
                  <p className="text-gray-600">
                    Manage employees across multiple shop locations from a single dashboard.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Automated Timesheets</h3>
                  <p className="text-gray-600">
                    Automatic timesheet generation with overtime calculations and break tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
