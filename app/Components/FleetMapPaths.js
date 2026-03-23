'use client';

// All coordinates are [longitude, latitude] — real geographic coordinates.
// react-simple-maps handles projection to screen x,y.
//
// North America bounding box roughly:
//   Longitude: -140° (west coast) to -50° (east coast)
//   Latitude:  70° (northern Canada) to 24° (southern US/Mexico border)
//
// Paths are cubic bezier defined by 4 control points, each [lng, lat].
// bezierGeoPoint() interpolates along the bezier in geo-space, then
// the caller uses the map projection to convert [lng,lat] → screen [x,y].

export const PLANE_PATHS = [
  // 1. Vancouver → Toronto (northern corridor)
  { from: 'Vancouver', to: 'Toronto',
    points: [ [-123.1, 49.3], [-110, 52], [-90, 51], [-79.4, 43.7] ] },

  // 2. Seattle → Montreal (diagonal NW → NE)
  { from: 'Seattle', to: 'Montréal',
    points: [ [-122.3, 47.6], [-105, 50], [-85, 48], [-73.6, 45.5] ] },

  // 3. Los Angeles → New York (coast to coast)
  { from: 'Los Angeles', to: 'New York',
    points: [ [-118.2, 34.1], [-100, 38], [-85, 40], [-74.0, 40.7] ] },

  // 4. San Francisco → Miami (W to SE diagonal)
  { from: 'San Francisco', to: 'Miami',
    points: [ [-122.4, 37.8], [-100, 36], [-85, 32], [-80.2, 25.8] ] },

  // 5. Calgary → Halifax (trans-Canada arc)
  { from: 'Calgary', to: 'Halifax',
    points: [ [-114.1, 51.1], [-95, 55], [-75, 54], [-63.6, 44.6] ] },

  // 6. Phoenix → Chicago (S to N midwest)
  { from: 'Phoenix', to: 'Chicago',
    points: [ [-112.1, 33.5], [-108, 36], [-96, 40], [-87.6, 41.9] ] },

  // 7. Dallas → Denver (south to mountain states)
  { from: 'Dallas', to: 'Denver',
    points: [ [-96.8, 32.8], [-99, 34], [-102, 37], [-104.9, 39.7] ] },

  // 8. Portland → Boston (northern coastal hop)
  { from: 'Portland OR', to: 'Boston',
    points: [ [-122.7, 45.5], [-105, 47], [-85, 46], [-71.1, 42.4] ] },

  // 9. LA → Atlanta (southern arc)
  { from: 'Los Angeles', to: 'Atlanta',
    points: [ [-118.2, 34.1], [-100, 33], [-90, 34], [-84.4, 33.7] ] },

  // 10. Minneapolis → New Orleans (N-S central corridor)
  { from: 'Minneapolis', to: 'New Orleans',
    points: [ [-93.3, 44.9], [-93, 42], [-90, 36], [-90.1, 29.9] ] },

  // 11. Vancouver → Halifax (full trans-Canada sweep)
  { from: 'Vancouver', to: 'Halifax',
    points: [ [-123.1, 49.3], [-105, 55], [-80, 57], [-63.6, 44.6] ] },

  // 12. Winnipeg → Québec City (central Canada arc)
  { from: 'Winnipeg', to: 'Québec City',
    points: [ [-97.1, 49.9], [-88, 52], [-78, 51], [-71.2, 46.8] ] },

  // 13. Edmonton → Ottawa (north-to-east Canada diagonal)
  { from: 'Edmonton', to: 'Ottawa',
    points: [ [-113.5, 53.5], [-100, 56], [-85, 54], [-75.7, 45.4] ] },
];

export const VAN_PATHS = [
  // Pacific Northwest
  { region: 'Seattle Metro',    points: [ [-122.3, 47.6], [-122.1, 47.5], [-122.0, 47.4], [-122.2, 47.3] ] },
  { region: 'Portland Loop',    points: [ [-122.7, 45.5], [-122.5, 45.4], [-122.4, 45.3], [-122.6, 45.2] ] },

  // California
  { region: 'LA Metro',         points: [ [-118.2, 34.1], [-118.0, 34.0], [-117.9, 33.9], [-118.1, 33.8] ] },
  { region: 'Bay Area Loop',    points: [ [-122.4, 37.8], [-122.2, 37.7], [-122.1, 37.6], [-122.3, 37.5] ] },
  { region: 'San Diego Run',    points: [ [-117.2, 32.7], [-117.0, 32.6], [-116.9, 32.5], [-117.1, 32.4] ] },

  // Southwest
  { region: 'Phoenix Metro',    points: [ [-112.1, 33.5], [-111.9, 33.4], [-111.8, 33.3], [-112.0, 33.2] ] },
  { region: 'Las Vegas Loop',   points: [ [-115.1, 36.2], [-114.9, 36.1], [-114.8, 36.0], [-115.0, 35.9] ] },

  // Mountain states
  { region: 'Denver Metro',     points: [ [-104.9, 39.7], [-104.7, 39.6], [-104.6, 39.5], [-104.8, 39.4] ] },
  { region: 'Salt Lake Run',    points: [ [-111.9, 40.8], [-111.7, 40.7], [-111.6, 40.6], [-111.8, 40.5] ] },

  // Texas
  { region: 'Dallas Metro',     points: [ [-96.8, 32.8], [-96.6, 32.7], [-96.5, 32.6], [-96.7, 32.5] ] },
  { region: 'Houston Loop',     points: [ [-95.4, 29.8], [-95.2, 29.7], [-95.1, 29.6], [-95.3, 29.5] ] },
  { region: 'San Antonio Rt',   points: [ [-98.5, 29.4], [-98.3, 29.3], [-98.2, 29.2], [-98.4, 29.1] ] },

  // Midwest
  { region: 'Chicago Metro',    points: [ [-87.6, 41.9], [-87.4, 41.8], [-87.3, 41.7], [-87.5, 41.6] ] },
  { region: 'Detroit Corridor', points: [ [-83.0, 42.3], [-82.8, 42.2], [-82.7, 42.1], [-82.9, 42.0] ] },
  { region: 'Minneapolis Loop', points: [ [-93.3, 44.9], [-93.1, 44.8], [-93.0, 44.7], [-93.2, 44.6] ] },

  // Southeast
  { region: 'Atlanta Metro',    points: [ [-84.4, 33.7], [-84.2, 33.6], [-84.1, 33.5], [-84.3, 33.4] ] },
  { region: 'Miami Loop',       points: [ [-80.2, 25.8], [-80.0, 25.7], [-79.9, 25.6], [-80.1, 25.5] ] },
  { region: 'Charlotte Route',  points: [ [-80.8, 35.2], [-80.6, 35.1], [-80.5, 35.0], [-80.7, 34.9] ] },

  // Northeast
  { region: 'NYC Metro',        points: [ [-74.0, 40.7], [-73.8, 40.6], [-73.7, 40.5], [-73.9, 40.4] ] },
  { region: 'Boston Loop',      points: [ [-71.1, 42.4], [-70.9, 42.3], [-70.8, 42.2], [-71.0, 42.1] ] },

  // Canada — British Columbia
  { region: 'Vancouver Metro',  points: [ [-123.1, 49.3], [-122.9, 49.2], [-122.8, 49.1], [-123.0, 49.0] ] },
  { region: 'Victoria Loop',    points: [ [-123.4, 48.4], [-123.2, 48.3], [-123.1, 48.2], [-123.3, 48.1] ] },
  { region: 'Kelowna Run',      points: [ [-119.5, 49.9], [-119.3, 49.8], [-119.2, 49.7], [-119.4, 49.6] ] },

  // Canada — Alberta
  { region: 'Calgary Metro',    points: [ [-114.1, 51.1], [-113.9, 51.0], [-113.8, 50.9], [-114.0, 50.8] ] },
  { region: 'Edmonton Loop',    points: [ [-113.5, 53.5], [-113.3, 53.4], [-113.2, 53.3], [-113.4, 53.2] ] },
  { region: 'Red Deer Route',   points: [ [-113.8, 52.3], [-113.6, 52.2], [-113.5, 52.1], [-113.7, 52.0] ] },

  // Canada — Saskatchewan
  { region: 'Saskatoon Metro',  points: [ [-106.7, 52.1], [-106.5, 52.0], [-106.4, 51.9], [-106.6, 51.8] ] },
  { region: 'Regina Loop',      points: [ [-104.6, 50.4], [-104.4, 50.3], [-104.3, 50.2], [-104.5, 50.1] ] },

  // Canada — Manitoba
  { region: 'Winnipeg Metro',   points: [ [-97.1, 49.9], [-96.9, 49.8], [-96.8, 49.7], [-97.0, 49.6] ] },
  { region: 'Brandon Run',      points: [ [-99.9, 49.8], [-99.7, 49.7], [-99.6, 49.6], [-99.8, 49.5] ] },

  // Canada — Ontario
  { region: 'Toronto Metro',    points: [ [-79.4, 43.7], [-79.2, 43.6], [-79.1, 43.5], [-79.3, 43.4] ] },
  { region: 'Ottawa Loop',      points: [ [-75.7, 45.4], [-75.5, 45.3], [-75.4, 45.2], [-75.6, 45.1] ] },
  { region: 'Hamilton Route',   points: [ [-79.9, 43.3], [-79.7, 43.2], [-79.6, 43.1], [-79.8, 43.0] ] },
  { region: 'London ON Run',    points: [ [-81.2, 43.0], [-81.0, 42.9], [-80.9, 42.8], [-81.1, 42.7] ] },

  // Canada — Québec
  { region: 'Montréal Metro',   points: [ [-73.6, 45.5], [-73.4, 45.4], [-73.3, 45.3], [-73.5, 45.2] ] },
  { region: 'Québec City Loop', points: [ [-71.2, 46.8], [-71.0, 46.7], [-70.9, 46.6], [-71.1, 46.5] ] },
  { region: 'Sherbrooke Run',   points: [ [-71.9, 45.4], [-71.7, 45.3], [-71.6, 45.2], [-71.8, 45.1] ] },

  // Canada — Maritimes
  { region: 'Halifax Metro',    points: [ [-63.6, 44.6], [-63.4, 44.5], [-63.3, 44.4], [-63.5, 44.3] ] },
  { region: 'Moncton Loop',     points: [ [-64.8, 46.1], [-64.6, 46.0], [-64.5, 45.9], [-64.7, 45.8] ] },
  { region: 'Saint John Run',   points: [ [-66.1, 45.3], [-65.9, 45.2], [-65.8, 45.1], [-66.0, 45.0] ] },
  { region: "St. John's Loop",  points: [ [-52.7, 47.6], [-52.5, 47.5], [-52.4, 47.4], [-52.6, 47.3] ] },
];

// Major city hubs to render as dots on the map
export const CITY_HUBS = [
  { name: 'Seattle',       coords: [-122.3, 47.6] },
  { name: 'Portland',      coords: [-122.7, 45.5] },
  { name: 'San Francisco', coords: [-122.4, 37.8] },
  { name: 'Los Angeles',   coords: [-118.2, 34.1] },
  { name: 'Las Vegas',     coords: [-115.1, 36.2] },
  { name: 'Phoenix',       coords: [-112.1, 33.5] },
  { name: 'Denver',        coords: [-104.9, 39.7] },
  { name: 'Dallas',        coords: [-96.8,  32.8] },
  { name: 'Houston',       coords: [-95.4,  29.8] },
  { name: 'Minneapolis',   coords: [-93.3,  44.9] },
  { name: 'Chicago',       coords: [-87.6,  41.9] },
  { name: 'Atlanta',       coords: [-84.4,  33.7] },
  { name: 'Miami',         coords: [-80.2,  25.8] },
  { name: 'Charlotte',     coords: [-80.8,  35.2] },
  { name: 'New York',      coords: [-74.0,  40.7] },
  { name: 'Boston',        coords: [-71.1,  42.4] },
  { name: 'Calgary',       coords: [-114.1, 51.1] },
  { name: 'Vancouver',     coords: [-123.1, 49.3] },
  { name: 'Toronto',       coords: [-79.4,  43.7] },
  { name: 'Montréal',      coords: [-73.6,  45.5] },
  { name: 'Halifax',       coords: [-63.6,  44.6] },
];

/**
 * Cubic bezier interpolation in geographic space.
 * @param {[number,number][]} pts  4 control points [[lng,lat], ...]
 * @param {number} t  0 → 1
 * @returns {[number, number]}  [longitude, latitude]
 */
export function bezierGeoPoint(pts, t) {
  const mt = 1 - t;
  const [p0, p1, p2, p3] = pts;
  const lng =
    mt * mt * mt * p0[0] +
    3 * mt * mt * t * p1[0] +
    3 * mt * t * t * p2[0] +
    t * t * t * p3[0];
  const lat =
    mt * mt * mt * p0[1] +
    3 * mt * mt * t * p1[1] +
    3 * mt * t * t * p2[1] +
    t * t * t * p3[1];

  // Compute derivative for rotation angle
  const dlng =
    3 * mt * mt * (p1[0] - p0[0]) +
    6 * mt * t * (p2[0] - p1[0]) +
    3 * t * t * (p3[0] - p2[0]);
  const dlat =
    3 * mt * mt * (p1[1] - p0[1]) +
    6 * mt * t * (p2[1] - p1[1]) +
    3 * t * t * (p3[1] - p2[1]);

  const angle = Math.atan2(-dlat, dlng) * (180 / Math.PI);
  return { lng, lat, angle };
}

export function getDayProgress() {
  const now = new Date();
  const seconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  return seconds / 86400;
}

export function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}
