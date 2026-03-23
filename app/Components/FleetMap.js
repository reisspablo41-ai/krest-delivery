'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from 'react-simple-maps';
import {
  PLANE_PATHS,
  VAN_PATHS,
  CITY_HUBS,
  bezierGeoPoint,
  getDayProgress,
  getDayOfYear,
} from './FleetMapPaths';

// TopoJSON source for world countries — we'll filter to USA + Canada
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Countries to render (ISO numeric codes)
// 840 = USA, 124 = Canada
const ALLOWED_COUNTRIES = new Set(['840', '124']);

function computeVehicles() {
  const progress = getDayProgress();
  const day = getDayOfYear();

  const planes = PLANE_PATHS.map((_, i) => {
    const pathIndex = (day + i) % PLANE_PATHS.length;
    const path = PLANE_PATHS[pathIndex];
    const t = (progress + i / PLANE_PATHS.length) % 1;
    const geo = bezierGeoPoint(path.points, t);
    return { ...geo, id: `plane-${i}`, label: `${path.from} → ${path.to}`, path };
  });

  const vans = VAN_PATHS.map((_, i) => {
    const pathIndex = (day + i) % VAN_PATHS.length;
    const path = VAN_PATHS[pathIndex];
    const t = (progress + i / VAN_PATHS.length) % 1;
    const geo = bezierGeoPoint(path.points, t);
    return { ...geo, id: `van-${i}`, label: path.region, path };
  });

  return { planes, vans };
}

export default function FleetMap() {
  const [vehicles, setVehicles] = useState({ planes: [], vans: [] });
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setVehicles(computeVehicles());
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // Bezier line midpoints for drawing ghost paths on the map
  const planeBezierLines = PLANE_PATHS.map((path) => {
    // Sample 20 points along the bezier to approximate the curve as a polyline
    const steps = 20;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const r = bezierGeoPoint(path.points, i / steps);
      return [r.lng, r.lat];
    });
  });

  return (
    <section className="bg-[#0d1610] py-12 md:py-20 relative overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-secondary/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-secondary" />
              <span className="text-secondary text-xs font-bold tracking-[0.3em] uppercase">LIVE OPERATIONS</span>
            </div>
            <h2 className="font-heading font-black italic text-4xl md:text-5xl text-white tracking-tighter leading-none uppercase">
              THE FLEET IS <span className="text-secondary">MOVING.</span>
            </h2>
            <p className="text-white/40 font-medium mt-3 text-sm max-w-md">
              <span className="text-secondary font-bold">13 aircraft</span> and <span className="text-secondary font-bold">44 ground units</span> actively traversing North America — positions update with real time.
            </p>
          </div>

          <div className="flex gap-3 shrink-0 flex-wrap">
            <Pill color="secondary" count={13} label="Aircraft" pulse />
            <Pill color="blue-400" count={44} label="Vans" pulse />
            <Pill color="green-400" count={null} label={time || '--:-- --'} pulse={false} />
          </div>
        </div>

        {/* Map Container */}
        <div className="relative bg-[#0a120c] rounded-[2rem] border overflow-hidden shadow-2xl" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          {/* Labels */}
          <div className="absolute top-3 left-4 text-white/20 text-[10px] font-bold tracking-widest uppercase z-20">NORTH AMERICA · LIVE</div>
          <div className="absolute bottom-3 right-4 text-white/20 text-[10px] font-bold tracking-widest uppercase z-20">UPDATES EVERY 30s</div>

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 380,
              center: [-96, 56],
            }}
            width={980}
            height={560}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            {/* Land + borders */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const id = String(geo.id);
                  const isAllowed = ALLOWED_COUNTRIES.has(id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isAllowed ? '#1a2e1d' : 'transparent'}
                      stroke={isAllowed ? '#2d4a31' : 'none'}
                      strokeWidth={0.8}
                      style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Ghost plane route lines */}
            {planeBezierLines.map((linePoints, i) => (
              <Line
                key={`ghost-${i}`}
                coordinates={linePoints}
                stroke="rgba(248,204,116,0.1)"
                strokeWidth={1}
                strokeDasharray="5,5"
                fill="none"
              />
            ))}

            {/* City hub dots */}
            {CITY_HUBS.map(({ name, coords }) => (
              <Marker key={name} coordinates={coords}>
                <circle r={2} fill="rgba(255,255,255,0.25)" />
                <circle r={1} fill="rgba(255,255,255,0.7)" />
              </Marker>
            ))}

            {/* PLANES */}
            {vehicles.planes.filter(v => v.lng != null && v.lat != null).map((v) => (
              <Marker key={v.id} coordinates={[v.lng, v.lat]}>
                <g transform={`rotate(${v.angle})`}>
                  <circle r={10} fill="rgba(248,204,116,0.1)" />
                  <rect x="-9" y="-2.5" width="15" height="5" rx="3" fill="#f8cc74" />
                  <polygon points="-2,-2.5 -2,-9 4,-2.5" fill="#f8cc74" opacity="0.85" />
                  <polygon points="-2,2.5 -2,9 4,2.5" fill="#f8cc74" opacity="0.85" />
                  <polygon points="-9,-2.5 -9,-5.5 -6,-2.5" fill="#f8cc74" opacity="0.6" />
                  <polygon points="-9,2.5 -9,5.5 -6,2.5" fill="#f8cc74" opacity="0.6" />
                  <circle cx="6" cy="0" r="1.5" fill="white" opacity="0.8" />
                </g>
              </Marker>
            ))}

            {/* VANS */}
            {vehicles.vans.filter(v => v.lng != null && v.lat != null).map((v) => (
              <Marker key={v.id} coordinates={[v.lng, v.lat]}>
                <g transform={`rotate(${v.angle})`}>
                  <circle r={7} fill="rgba(96,165,250,0.12)" />
                  <rect x="-7" y="-3.5" width="14" height="7" rx="2" fill="#60a5fa" />
                  <rect x="3" y="-3.5" width="6" height="5.5" rx="1" fill="#3b82f6" />
                  <rect x="4" y="-3" width="4" height="3.5" rx="0.5" fill="rgba(255,255,255,0.35)" />
                  <circle cx="-3.5" cy="4" r="1.5" fill="#1e3a5f" />
                  <circle cx="5" cy="4" r="1.5" fill="#1e3a5f" />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-6 items-center justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-5 h-2.5 bg-secondary rounded-sm opacity-90" />
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Aircraft (13)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-2.5 bg-blue-400 rounded-sm opacity-90" />
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Ground Units (44)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 border-t border-dashed border-secondary/30" />
            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Daily routes (rotate each day)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ color, count, label, pulse }) {
  const colorMap = {
    secondary: { bg: 'bg-secondary/10 border-secondary/20', dot: 'bg-secondary', text: 'text-secondary', num: 'text-white' },
    'blue-400': { bg: 'bg-blue-500/10 border-blue-500/20', dot: 'bg-blue-400', text: 'text-blue-400', num: 'text-white' },
    'green-400': { bg: 'bg-green-500/10 border-green-500/20', dot: 'bg-green-400', text: 'text-green-400', num: 'text-white' },
  };
  const s = colorMap[color] || colorMap['secondary'];
  return (
    <div className={`${s.bg} border rounded-2xl px-5 py-3.5 text-center min-w-[80px]`}>
      <div className="flex items-center gap-1.5 justify-center mb-0.5">
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${pulse ? 'animate-pulse' : ''}`} />
        <span className={`${s.text} text-[10px] font-bold tracking-widest uppercase`}>{label}</span>
      </div>
      {count !== null && <p className={`${s.num} font-heading font-black italic text-2xl leading-none`}>{count}</p>}
    </div>
  );
}
