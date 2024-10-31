'use client';

import * as React from 'react';
import axios from 'axios';
import L from 'leaflet';
import { Circle, MapContainer, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

// HeatmapLayer component to render the heatmap layer
const HeatmapLayer: React.FC<{ points: [number, number, number][] }> = ({ points }) => {
  const map = useMap();

  React.useEffect(() => {
    if (map) {
      // Create the heatmap layer with increased radius and blur
      const heatLayer = L.heatLayer(points, {
        radius: 30, // Increase radius for larger heat points
        blur: 20, // Increase blur for smoother transition
        max: 1, // Set max to the maximum intensity value (adjust as needed)
      }).addTo(map);

      // Clean up the layer when the component unmounts
      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [map, points]);

  return null;
};

// Main Page component
export default function Page(): React.JSX.Element {
  const [data, setData] = React.useState<{ latitude: number; longitude: number }[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.3:5000/api/heatmap-data');
        const values = response.data.values;

        // Filter out entries with unknown latitude or longitude
        const validData = values
          .filter((item) => item.latitude !== 'unknown' && item.longitude !== 'unknown')
          .map((item) => ({
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          }));

        // Set the valid data for rendering circles and heatmap
        setData(validData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to find current location
  const findCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const map = useMap();
          map.setView([latitude, longitude], 15); // Adjust the zoom level as needed

          // Optionally, you can add a marker for the current location
          L.marker([latitude, longitude]).addTo(map).bindPopup('You are here!').openPopup();
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      <button
        onClick={findCurrentLocation}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          outline: 'none',
        }}
      >
        <i className="fas fa-location-arrow" />
      </button>
      <MapContainer center={[23.8103, 90.4125]} zoom={12} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.length > 0 && <HeatmapLayer points={data.map((item) => [item.latitude, item.longitude, 5])} />}
        {data.map((item, index) => (
          <Circle
            key={index}
            center={[item.latitude, item.longitude]}
            radius={50} // Set the radius of the circle
            color="blue" // Set the circle color
            fillColor="blue" // Set the fill color
            fillOpacity={0.5} // Set the fill opacity
          />
        ))}
      </MapContainer>
    </>
  );
}
