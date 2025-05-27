
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
    console.log('AttendanceMap mounting with employees:', employees, 'shops:', shops);
    
    if (!mapRef.current) {
      console.log('Map ref not available');
      return;
    }

    // Clean up previous map instance
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      try {
        // Initialize map centered on NYC
        mapInstance.current = L.map(mapRef.current, {
          center: [40.7128, -74.0060],
          zoom: 12,
          zoomControl: true,
          scrollWheelZoom: true
        });

        console.log('Map initialized successfully');

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapInstance.current);

        // Add shop markers (blue)
        if (shops && shops.length > 0) {
          console.log('Adding shop markers:', shops.length);
          shops.forEach(shop => {
            const shopIcon = L.divIcon({
              className: 'custom-shop-marker',
              html: '<div style="background-color: #2563eb; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold; box-shadow: 0 3px 10px rgba(0,0,0,0.4); z-index: 1000;">S</div>',
              iconSize: [28, 28],
              iconAnchor: [14, 14]
            });

            L.marker([shop.lat, shop.lng], { icon: shopIcon })
              .addTo(mapInstance.current)
              .bindPopup(`<div style="text-align: center; padding: 8px;"><b>${shop.name}</b><br/>Shop Location</div>`);

            // Add circle around shop location to show valid range
            L.circle([shop.lat, shop.lng], {
              color: '#2563eb',
              fillColor: '#2563eb',
              fillOpacity: 0.1,
              weight: 2,
              radius: 200 // 200 meters
            }).addTo(mapInstance.current);
          });
        }

        // Add employee check-in markers with proper color coding
        if (employees && employees.length > 0) {
          console.log('Adding employee markers:', employees.length);
          employees.forEach(employee => {
            if (employee.checkInLocation) {
              let color, symbol, statusText;
              
              // Enhanced color coding based on status
              switch (employee.status) {
                case 'Present':
                  color = '#16a34a'; // Green
                  symbol = '✓';
                  statusText = 'Present';
                  break;
                case 'Out of Range':
                  color = '#dc2626'; // Red
                  symbol = '✗';
                  statusText = 'Out of Range';
                  break;
                case 'Absent':
                  color = '#9ca3af'; // Gray
                  symbol = '?';
                  statusText = 'Absent';
                  break;
                default:
                  color = '#f59e0b'; // Orange
                  symbol = '?';
                  statusText = 'Unknown';
              }
              
              const employeeIcon = L.divIcon({
                className: 'custom-employee-marker',
                html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; box-shadow: 0 3px 8px rgba(0,0,0,0.4); z-index: 1001;">${symbol}</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });

              L.marker([employee.checkInLocation.lat, employee.checkInLocation.lng], { icon: employeeIcon })
                .addTo(mapInstance.current)
                .bindPopup(`<div style="text-align: center; padding: 10px; min-width: 120px;">
                  <b style="color: ${color};">${employee.name}</b><br/>
                  <span style="color: ${color}; font-weight: bold;">Status: ${statusText}</span><br/>
                  ${employee.checkInTime ? `Time: ${employee.checkInTime}` : 'No check-in time'}
                </div>`);
            }
          });
        }

        // Force map to invalidate size after everything is loaded
        setTimeout(() => {
          if (mapInstance.current) {
            mapInstance.current.invalidateSize();
          }
        }, 100);

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 50);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [employees, shops]);

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl text-gray-900">Live Attendance Map</CardTitle>
        
        <div className="flex flex-wrap gap-4 text-sm mt-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded-full shadow-sm border-2 border-white"></div>
            <span className="text-gray-700 font-medium">Shop Locations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-600 rounded-full shadow-sm border-2 border-white"></div>
            <span className="text-gray-700 font-medium">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-600 rounded-full shadow-sm border-2 border-white"></div>
            <span className="text-gray-700 font-medium">Out of Range</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-500 rounded-full shadow-sm border-2 border-white"></div>
            <span className="text-gray-700 font-medium">Absent</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-96 rounded-b-lg overflow-hidden bg-gray-100">
          <div ref={mapRef} className="w-full h-full" style={{ minHeight: '384px' }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceMap;
