
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CheckInButton from './CheckInButton';
import EmployeeMap from './EmployeeMap';
import { MapPin, Clock, User } from 'lucide-react';

const EmployeeDashboard = ({ user, onLogout }) => {
  const [checkInStatus, setCheckInStatus] = useState({
    hasCheckedIn: false,
    status: 'Not Checked In',
    time: null,
    location: null
  });

  const isCheckInTime = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 9 && hours < 17; // 9 AM to 5 PM
  };

  const handleCheckIn = (status, location) => {
    const now = new Date();
    setCheckInStatus({
      hasCheckedIn: true,
      status,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Out of Range': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Employee Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="outline" onClick={onLogout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Assigned Shop</p>
                <p className="text-lg">{user.assignedShop.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check-in Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Today's Check-in Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Badge className={getStatusColor(checkInStatus.status)}>
                {checkInStatus.status}
              </Badge>
              {checkInStatus.time && (
                <span className="text-sm text-gray-600">
                  Checked in at {checkInStatus.time}
                </span>
              )}
            </div>
            
            {!checkInStatus.hasCheckedIn && isCheckInTime() && (
              <CheckInButton 
                assignedShop={user.assignedShop} 
                onCheckIn={handleCheckIn}
              />
            )}
            
            {!checkInStatus.hasCheckedIn && !isCheckInTime() && (
              <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-md">
                <p className="text-sm text-yellow-800">
                  Check-in is only available between 9:00 AM and 5:00 PM
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Map Card */}
        {checkInStatus.location && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Check-in Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeMap 
                checkInLocation={checkInStatus.location}
                assignedShop={user.assignedShop}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
