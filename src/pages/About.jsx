
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Target, Users, Award, Heart, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Employee Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing workforce management with cutting-edge location-based 
            attendance tracking that brings transparency, accuracy, and efficiency to businesses worldwide.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <CardTitle className="text-2xl text-gray-900">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with intelligent workforce management solutions that 
                eliminate attendance fraud, increase productivity, and foster trust between 
                employers and employees through transparent tracking systems.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <CardTitle className="text-2xl text-gray-900">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 leading-relaxed">
                To become the leading platform for location-based workforce management, 
                setting new standards for accuracy, reliability, and user experience in 
                employee attendance tracking worldwide.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Story */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Story</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Employee Tracker was born from a simple observation: traditional attendance systems 
                were failing businesses and employees alike. Punch cards could be manipulated, 
                manual logs were unreliable, and existing digital solutions lacked the precision 
                needed for modern workforce management.
              </p>
              <p>
                Our team of experienced developers and business professionals came together with 
                a shared vision: to create a system that would bring complete transparency and 
                accuracy to employee attendance tracking while being incredibly easy to use.
              </p>
              <p>
                Today, Employee Tracker serves businesses of all sizes, from small retail shops 
                to large enterprises with multiple locations. Our GPS-based check-in system has 
                helped thousands of companies improve their workforce management and build stronger 
                relationships with their employees.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <Heart className="w-10 h-10 text-purple-600 mb-4 mx-auto" />
                <CardTitle className="text-xl text-gray-900">Trust & Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in building trust through complete transparency in our tracking 
                  methods and data handling practices.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-white">
              <CardHeader>
                <Award className="w-10 h-10 text-orange-600 mb-4 mx-auto" />
                <CardTitle className="text-xl text-gray-900">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We strive for excellence in every feature we build, ensuring reliability 
                  and accuracy in all our solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-teal-50 to-white">
              <CardHeader>
                <Users className="w-10 h-10 text-teal-600 mb-4 mx-auto" />
                <CardTitle className="text-xl text-gray-900">User-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our users are at the heart of everything we do. We design solutions that 
                  are intuitive, efficient, and valuable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-6">Powered by Advanced Technology</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Our platform leverages cutting-edge GPS technology, real-time mapping, and 
              intelligent geofencing to deliver the most accurate attendance tracking solution 
              available. Built with modern web technologies for reliability, speed, and scalability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
