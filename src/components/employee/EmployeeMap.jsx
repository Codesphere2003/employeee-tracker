
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
    if (!mapRef.current || !checkInLocation) return;

    // Initialize map centered on check-in location
    mapInstance.current = L.map(mapRef.current).setView([checkInLocation.lat, checkInLocation.lng], 15);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);

    // Add assigned shop marker (blue)
    const shopIcon = L.divIcon({
      className: 'custom-shop-marker',
      html: '<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">S</div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([assignedShop.lat, assignedShop.lng], { icon: shopIcon })
      .addTo(mapInstance.current)
      .bindPopup(`<b>${assignedShop.name}</b><br/>Your assigned shop`);

    // Add check-in location marker (green)
    const checkInIcon = L.divIcon({
      className: 'custom-checkin-marker',
      html: '<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px;">✓</div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker([checkInLocation.lat, checkInLocation.lng], { icon: checkInIcon })
      .addTo(mapInstance.current)
      .bindPopup('<b>Your Check-in Location</b>');

    // Add circle around shop location to show valid range
    L.circle([assignedShop.lat, assignedShop.lng], {
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.1,
      radius: 200 // 200 meters
    }).addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [checkInLocation, assignedShop]);

  return <div ref={mapRef} className="w-full h-64 rounded-lg" />;
};

export default EmployeeMap;
