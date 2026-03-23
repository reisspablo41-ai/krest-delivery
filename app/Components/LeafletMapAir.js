'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TimerContext from '../Context/TimerContext';

function Routing({
  olat,
  olng,
  ilat1,
  ilng1,
  ilat2,
  ilng2,
  dlat,
  dlng,
  percentage,
  onThirdMarkerUpdate,
  onBearingUpdate,
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Dynamically build waypoints based on provided props
    const points = [[olat, olng]];
    if (ilat1 !== undefined && ilng1 !== undefined) points.push([ilat1, ilng1]); // First Stop
    if (ilat2 !== undefined && ilng2 !== undefined) points.push([ilat2, ilng2]); // Second Stop
    points.push([dlat, dlng]); // Destination

    // Create the polyline between the points
    const polyline = L.polyline(points, { color: 'red', weight: 5 }).addTo(map);

    // 🚀 Explicitly fit the map to the polyline bounds
    map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

    // Determine which segment the plane is on
    const segmentsCount = points.length - 1;
    const totalPercentage = percentage;
    const segmentIndex = Math.min(Math.floor(totalPercentage * segmentsCount), segmentsCount - 1);
    
    const startPoint = points[segmentIndex];
    const endPoint = points[segmentIndex + 1];
    
    // Linearly interpolate between the two points of the current segment
    const segmentPercentage = (totalPercentage * segmentsCount) - segmentIndex;
    const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * segmentPercentage;
    const lng = startPoint[1] + (endPoint[1] - startPoint[1]) * segmentPercentage;

    onThirdMarkerUpdate([lat, lng]);

    // Calculate bearing
    if (onBearingUpdate) {
      const angle = Math.atan2(endPoint[1] - startPoint[1], endPoint[0] - startPoint[0]) * (180 / Math.PI);
      onBearingUpdate(angle);
    }

    return () => {
      map.removeLayer(polyline);
    };
  }, [
    map,
    olat,
    olng,
    ilat1,
    ilng1,
    ilat2,
    ilng2,
    dlat,
    dlng,
    percentage,
    onThirdMarkerUpdate,
    onBearingUpdate,
  ]);

  return null;
}

function LeafletMapAir({
  olat,
  olng,
  ilat1,
  ilng1,
  ilat2,
  ilng2,
  dlat,
  dlng,
  percentage,
  shipmentId,
}) {
  percentage = percentage / 100;
  const { presentLocation, setPresentLocation, setActiveAddress } =
    useContext(TimerContext);
  const [thirdMarker, setThirdMarker] = useState(null);
  const [bearing, setBearing] = useState(0);
  const [baseMap, setBaseMap] = useState('osm'); // 'osm' or 'satellite'

  const originDestinationIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const planeIconSVG = `
    <div style="transform: rotate(${bearing}deg); width: 30px; height: 30px; margin-left: -15px; margin-top: -15px; filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.3)); transition: transform 0.5s ease;">
      <svg width="30" height="30" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 2 L35 25 L62 42 L35 40 L32 58 L29 40 L2 42 L29 25 L32 2 Z" fill="#10B981" stroke="#047857" stroke-width="2"/>
      </svg>
    </div>
  `;

  const dynamicPlaneIcon = L.divIcon({
    className: 'custom-plane-icon',
    html: planeIconSVG,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

  useEffect(() => {
    if (thirdMarker) {
      setPresentLocation(thirdMarker);
      setActiveAddress(shipmentId);
    }
  }, [thirdMarker, setPresentLocation, setActiveAddress, shipmentId]);

  const toggleBaseMap = () => setBaseMap(b => b === 'osm' ? 'satellite' : 'osm');

  return (
    <div className="flex flex-col h-full w-full relative">
      <button
        onClick={toggleBaseMap}
        className="w-full py-3.5 bg-primary hover:bg-[#1f2e22] text-white font-black italic tracking-widest uppercase transition-colors z-[1000] relative shadow-md border-b border-white/5 text-xs md:text-sm"
      >
        Map Layer: {baseMap === 'osm' ? 'Standard (OSM)' : 'Satellite (Imagery)'}
      </button>
      <div className="flex-1 relative min-h-[500px]">
        <MapContainer
          center={[(olat + dlat) / 2, (olng + dlng) / 2]}
          zoom={8}
          style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
          className="z-0"
        >
          {baseMap === 'osm' ? (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          ) : (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri"
            />
          )}

        <Routing
          olat={olat}
          olng={olng}
          ilat1={ilat1}
          ilng1={ilng1}
          ilat2={ilat2}
          ilng2={ilng2}
          dlat={dlat}
          dlng={dlng}
          percentage={percentage}
          onThirdMarkerUpdate={setThirdMarker}
          onBearingUpdate={setBearing}
        />
        <Marker position={[olat, olng]} icon={originDestinationIcon} />
        {thirdMarker && <Marker position={thirdMarker} icon={dynamicPlaneIcon} zIndexOffset={1000} />}
        {ilat1 !== undefined && ilng1 !== undefined && (
          <Marker position={[ilat1, ilng1]} icon={originDestinationIcon} />
        )}
        {ilat2 !== undefined && ilng2 !== undefined && (
          <Marker position={[ilat2, ilng2]} icon={originDestinationIcon} />
        )}
        <Marker position={[dlat, dlng]} icon={originDestinationIcon} />
      </MapContainer>
      </div>
    </div>
  );
}

export default LeafletMapAir;
