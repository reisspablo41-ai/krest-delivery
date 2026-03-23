'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import TimerContext from '../Context/TimerContext';

function Routing({ olat, olng, dlat, dlng, percentage, onThirdMarkerUpdate, onBearingUpdate }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const router = L.Routing.control({
      waypoints: [L.latLng(olat, olng), L.latLng(dlat, dlng)],
      routeWhileDragging: false,
      createMarker: () => null, // No markers
      addWaypoints: false,
      show: false, // 🚀 Hide text directions
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: 'red', weight: 5 }], // Red, thick route
      },
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
    }).addTo(map);

    router.on('routesfound', (e) => {
      const route = e.routes[0];
      const coordinates = route.coordinates;

      // 🚀 Explicitly fit the map to the route bounds
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });

      if (coordinates.length > 1) {
        const index = Math.floor(percentage * (coordinates.length - 1));
        const { lat, lng } = coordinates[index];

        onThirdMarkerUpdate([lat, lng]); // Send location to parent component

        // Calculate simple bearing from previous waypoint for the icon rotation
        if (index > 0 && onBearingUpdate) {
          const prev = coordinates[index - 1];
          // Simplified bearing calculation for small distances
          let angle = Math.atan2(lng - prev.lng, lat - prev.lat) * (180 / Math.PI);
          onBearingUpdate(angle);
        } else if (index < coordinates.length - 1 && onBearingUpdate) {
          const next = coordinates[index + 1];
          let angle = Math.atan2(next.lng - lng, next.lat - lat) * (180 / Math.PI);
          onBearingUpdate(angle);
        }
      }
    });

    setTimeout(() => {
      document
        .querySelectorAll('.leaflet-routing-container')
        .forEach((el) => el.remove());
    }, 100);

    return () => {
      map.removeControl(router);
    };
  }, [map, olat, olng, dlat, dlng, percentage, onThirdMarkerUpdate, onBearingUpdate]);

  return null;
}

function LeafletMap({ olat, olng, dlat, dlng, percentage, shipmentId }) {
  percentage = percentage / 100;
  const { presentLocation, setPresentLocation, address, setActiveAddress } =
    useContext(TimerContext);
  const [thirdMarker, setThirdMarker] = useState(null);
  const [bearing, setBearing] = useState(0);
  const [baseMap, setBaseMap] = useState('osm'); // 'osm' or 'satellite'
  const [view, setView] = useState('3d'); // '2d' or '3d'

  const toggleBaseMap = () => setBaseMap(b => b === 'osm' ? 'satellite' : 'osm');
  const toggleView = () => setView(v => v === '3d' ? '2d' : '3d');
  const center = [(olat + dlat) / 2, (olng + dlng) / 2];

  const originDestinationIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const vanIconSVG = `
    <div style="transform: rotate(${bearing}deg); width: 22px; height: 44px; margin-left: -11px; margin-top: -22px; filter: drop-shadow(0px 3px 4px rgba(0,0,0,0.3)); transition: transform 0.5s ease;">
      <svg width="22" height="44" viewBox="0 0 32 64" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <rect x="2" y="2" width="28" height="60" rx="6" fill="#10B981" stroke="#047857" stroke-width="2"/>
        <!-- Windshield -->
        <rect x="4" y="14" width="24" height="10" rx="2" fill="#1E293B"/>
        <!-- Roof -->
        <rect x="4" y="26" width="24" height="30" rx="3" fill="#059669"/>
        <!-- Front bumper -->
        <path d="M 6 2 L 26 2 C 28 2 30 4 30 6 L 2 6 C 2 4 4 2 6 2 Z" fill="#334155"/>
        <!-- Headlights -->
        <rect x="4" y="2" width="6" height="3" fill="#FDE047" rx="1"/>
        <rect x="22" y="2" width="6" height="3" fill="#FDE047" rx="1"/>
        <!-- Taillights -->
        <rect x="4" y="60" width="6" height="2" fill="#EF4444"/>
        <rect x="22" y="60" width="6" height="2" fill="#EF4444"/>
      </svg>
    </div>
  `;

  const dynamicVanIcon = L.divIcon({
    className: 'custom-van-icon',
    html: vanIconSVG,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

  useEffect(() => {
    if (thirdMarker) {
      setPresentLocation(thirdMarker);
      setActiveAddress(shipmentId);
    }
  }, [thirdMarker, setPresentLocation, setActiveAddress, shipmentId]);

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="flex w-full z-[1000] relative shadow-md">
        <button
          onClick={toggleBaseMap}
          className="flex-1 py-3.5 bg-primary hover:bg-[#1f2e22] text-white font-black italic tracking-widest uppercase transition-colors border-b border-white/5 text-xs md:text-sm"
        >
          Map Layer: {baseMap === 'osm' ? 'Standard (OSM)' : 'Satellite (Imagery)'}
        </button>
      </div>

      <div className="flex-1 relative min-h-[500px] border-t border-white/5">
        <MapContainer
          center={center}
          zoom={8}
          style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
          className="z-0"
        >
          {baseMap === 'osm' ? (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
            dlat={dlat}
            dlng={dlng}
            percentage={percentage}
            onThirdMarkerUpdate={setThirdMarker}
            onBearingUpdate={setBearing}
          />
          <Marker position={[olat, olng]} icon={originDestinationIcon}>
            <Tooltip
              permanent
              direction="top"
              offset={[0, -40]}
              className="custom-tooltip"
            >
              Origin
            </Tooltip>
          </Marker>
          {thirdMarker && <Marker position={thirdMarker} icon={dynamicVanIcon} zIndexOffset={1000} />}
          <Marker position={[dlat, dlng]} icon={originDestinationIcon}>
            <Tooltip
              permanent
              direction="top"
              offset={[0, -40]}
              className="custom-tooltip"
            >
              Destination
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default LeafletMap;
