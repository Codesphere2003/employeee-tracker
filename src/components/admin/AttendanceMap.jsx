
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@googlemaps/js-api-loader";

const AttendanceMap = ({ employees, shops }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [apiKey, setApiKey] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState('');

  const initializeMap = async (googleMapsApiKey) => {
    if (!mapRef.current || !googleMapsApiKey) return;

    try {
      const loader = new Loader({
        apiKey: googleMapsApiKey,
        version: "weekly",
        libraries: ["places"]
      });

      const google = await loader.load();
      
      // Initialize map
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      // Add shop markers (blue)
      if (shops && shops.length > 0) {
        shops.forEach(shop => {
          const shopMarker = new google.maps.Marker({
            position: { lat: shop.lat, lng: shop.lng },
            map: mapInstance.current,
            title: shop.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: '#3b82f6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
            }
          });

          const shopInfoWindow = new google.maps.InfoWindow({
            content: `<div style="text-align: center; padding: 8px;"><b>${shop.name}</b><br/>Shop Location</div>`
          });

          shopMarker.addListener('click', () => {
            shopInfoWindow.open(mapInstance.current, shopMarker);
          });
        });
      }

      // Add employee check-in markers
      if (employees && employees.length > 0) {
        employees.forEach(employee => {
          if (employee.checkInLocation) {
            const color = employee.status === 'Present' ? '#10b981' : '#ef4444';
            
            const employeeMarker = new google.maps.Marker({
              position: { lat: employee.checkInLocation.lat, lng: employee.checkInLocation.lng },
              map: mapInstance.current,
              title: employee.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: color,
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }
            });

            const employeeInfoWindow = new google.maps.InfoWindow({
              content: `<div style="text-align: center; padding: 8px;"><b>${employee.name}</b><br/>Status: ${employee.status}<br/>Time: ${employee.checkInTime}</div>`
            });

            employeeMarker.addListener('click', () => {
              employeeInfoWindow.open(mapInstance.current, employeeMarker);
            });
          }
        });
      }

      setMapLoaded(true);
      setError('');
    } catch (err) {
      console.error('Error loading Google Maps:', err);
      setError('Failed to load Google Maps. Please check your API key.');
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      initializeMap(apiKey.trim());
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50">
        <CardTitle className="text-xl text-gray-900">Live Attendance Map</CardTitle>
        
        {!mapLoaded && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Enter your Google Maps API key to load the map. Get one at{' '}
              <a 
                href="https://console.cloud.google.com/google/maps-apis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Google Cloud Console
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter Google Maps API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleApiKeySubmit} disabled={!apiKey.trim()}>
                Load Map
              </Button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        )}

        {mapLoaded && (
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
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-96 rounded-b-lg overflow-hidden">
          <div ref={mapRef} className="w-full h-full bg-gray-100 flex items-center justify-center">
            {!mapLoaded && !error && (
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">Google Maps</p>
                <p className="text-sm">Enter API key to load map</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceMap;
