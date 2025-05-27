
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';

const CheckInButton = ({ assignedShop, onCheckIn }) => {
  const [isLoading, setIsLoading] = useState(false);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const handleCheckIn = () => {
    setIsLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          const distance = calculateDistance(
            userLat, userLng,
            assignedShop.lat, assignedShop.lng
          );

          const isInRange = distance <= 200; // 200 meters tolerance
          const status = isInRange ? 'Present' : 'Out of Range';
          
          onCheckIn(status, { lat: userLat, lng: userLng });
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckIn} 
      disabled={isLoading}
      className="w-full"
    >
      <MapPin className="mr-2 h-4 w-4" />
      {isLoading ? 'Getting Location...' : 'Check In'}
    </Button>
  );
};

export default CheckInButton;
