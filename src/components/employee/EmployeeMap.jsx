
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const EmployeeMap = ({ checkInLocation, assignedShop }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !checkInLocation || !assignedShop) return;

    // Clean up previous map instance
    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    // Initialize map centered on check-in location
    mapInstance.current = L.map(mapRef.current).setView([checkInLocation.lat, checkInLocation.lng], 16);

    // Add tile layer with error handling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      crossOrigin: true
    }).addTo(mapInstance.current);

    // Add assigned shop marker (blue)
    const shopIcon = L.divIcon({
      className: 'custom-shop-marker',
      html: '<div style="background-color: #3b82f6; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">S</div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    L.marker([assignedShop.lat, assignedShop.lng], { icon: shopIcon })
      .addTo(mapInstance.current)
      .bindPopup(`<div style="text-align: center;"><b>${assignedShop.name}</b><br/>Your assigned shop</div>`);

    // Add check-in location marker (green)
    const checkInIcon = L.divIcon({
      className: 'custom-checkin-marker',
      html: '<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">✓</div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([checkInLocation.lat, checkInLocation.lng], { icon: checkInIcon })
      .addTo(mapInstance.current)
      .bindPopup('<div style="text-align: center;"><b>Your Check-in Location</b></div>');

    // Add circle around shop location to show valid range
    L.circle([assignedShop.lat, assignedShop.lng], {
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.15,
      weight: 2,
      radius: 200 // 200 meters
    }).addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [checkInLocation, assignedShop]);

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default EmployeeMap;
