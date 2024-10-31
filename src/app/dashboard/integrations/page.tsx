'use client';

import * as React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Make sure to install leaflet.heat

import axios from 'axios';
import L from 'leaflet';

const HeatmapLayer: React.FC<{ points: [number, number, number][] }> = ({ points }) => {
  const map = useMap();

  React.useEffect(() => {
    if (map) {
      // Create the heatmap layer
      const heatLayer = L.heatLayer(points, { radius: 20, blur: 15 }).addTo(map);

      // Clean up the layer when the component unmounts
      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [map, points]);

  return null;
};

export default function Page(): React.JSX.Element {
  const [heatmapData, setHeatmapData] = React.useState<[number, number, number][]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.3:5000/api/heatmap-data'); // Ensure this endpoint is correct
      if (response.status === 200) {
        const data = response.data.values;

        const maxArea = 518400;
        const processedData = data
          .filter(
            (loc: { latitude: string; longitude: string; area: string }) =>
              loc.latitude !== 'unknown' &&
              loc.longitude !== 'unknown' &&
              !isNaN(parseFloat(loc.latitude)) &&
              !isNaN(parseFloat(loc.longitude))
          )
          .map((loc: { latitude: string; longitude: string; area: string }) => {
            const latitude = parseFloat(loc.latitude);
            const longitude = parseFloat(loc.longitude);
            const area = parseFloat(loc.area);
            const normalizedArea = Math.min(area / maxArea, 1); // Normalize and cap at 1
            return [latitude, longitude, normalizedArea];
          });

        setHeatmapData(processedData);
      } else {
        console.warn('Failed to fetch heatmap data');
      }
    } catch (error) {
      console.error('Error fetching heatmap data:', error);
      alert('Error fetching heatmap data.');
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <MapContainer center={[23.8103, 90.4125]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {heatmapData.length > 0 && <HeatmapLayer points={heatmapData} />}
    </MapContainer>
  );
}
