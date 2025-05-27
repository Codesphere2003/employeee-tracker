
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

    // Clean up previous map instance
    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    // Initialize map centered on NYC
    mapInstance.current = L.map(mapRef.current).setView([40.7128, -74.0060], 12);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstance.current);

    // Add shop markers (blue)
    if (shops && shops.length > 0) {
      shops.forEach(shop => {
        const shopIcon = L.divIcon({
          className: 'custom-shop-marker',
          html: '<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">S</div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([shop.lat, shop.lng], { icon: shopIcon })
          .addTo(mapInstance.current)
          .bindPopup(`<div style="text-align: center; padding: 8px;"><b>${shop.name}</b><br/>Shop Location</div>`);

        // Add circle around shop location to show valid range
        L.circle([shop.lat, shop.lng], {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.1,
          weight: 2,
          radius: 200 // 200 meters
        }).addTo(mapInstance.current);
      });
    }

    // Add employee check-in markers
    if (employees && employees.length > 0) {
      employees.forEach(employee => {
        if (employee.checkInLocation) {
          const color = employee.status === 'Present' ? '#10b981' : '#ef4444';
          const symbol = employee.status === 'Present' ? '✓' : '✗';
          
          const employeeIcon = L.divIcon({
            className: 'custom-employee-marker',
            html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">${symbol}</div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

          L.marker([employee.checkInLocation.lat, employee.checkInLocation.lng], { icon: employeeIcon })
            .addTo(mapInstance.current)
            .bindPopup(`<div style="text-align: center; padding: 8px;"><b>${employee.name}</b><br/>Status: ${employee.status}<br/>Time: ${employee.checkInTime}</div>`);
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [employees, shops]);

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50">
        <CardTitle className="text-xl text-gray-900">Live Attendance Map</CardTitle>
        
        <div className="flex gap-6 text-sm mt-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
            <span className="text-gray-600 font-medium">Shop Locations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
            <span className="text-gray-600 font-medium">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
            <span className="text-gray-600 font-medium">Out of Range</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-96 rounded-b-lg overflow-hidden">
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceMap;
