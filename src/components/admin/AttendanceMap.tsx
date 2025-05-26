
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AttendanceMap = ({ employees, shops }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstance.current = L.map(mapRef.current).setView([40.7128, -74.0060], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);

    // Add shop markers (blue)
    shops.forEach(shop => {
      const shopIcon = L.divIcon({
        className: 'custom-shop-marker',
        html: '<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      L.marker([shop.lat, shop.lng], { icon: shopIcon })
        .addTo(mapInstance.current)
        .bindPopup(`<b>${shop.name}</b><br/>Shop Location`);
    });

    // Add employee check-in markers
    employees.forEach(employee => {
      if (employee.checkInLocation) {
        const color = employee.status === 'Present' ? '#10b981' : '#ef4444';
        
        const employeeIcon = L.divIcon({
          className: 'custom-employee-marker',
          html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        L.marker([employee.checkInLocation.lat, employee.checkInLocation.lng], { icon: employeeIcon })
          .addTo(mapInstance.current)
          .bindPopup(`<b>${employee.name}</b><br/>Status: ${employee.status}<br/>Time: ${employee.checkInTime}`);
      }
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [employees, shops]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Map</CardTitle>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Shops</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Out of Range</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div ref={mapRef} className="w-full h-96 rounded-lg"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceMap;
