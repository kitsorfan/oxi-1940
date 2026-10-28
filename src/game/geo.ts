// The base map is Wikipedia's "Greece relief location map": an equirectangular
// projection, so latitude and longitude map linearly onto the image.
export const MAP = {
  image: 'greece-relief',
  width: 1003,
  height: 825,
  north: 42.0,
  south: 34.6,
  west: 19.1,
  east: 29.9,
} as const;

/** The part of the map shown in the game: Greece and southern Albania, without most of Anatolia. */
export const VIEW = { x: 0, y: 0, width: 870, height: 825 } as const;

export interface Point {
  x: number;
  y: number;
}

export function project(lat: number, lon: number): Point {
  return {
    x: ((lon - MAP.west) / (MAP.east - MAP.west)) * MAP.width,
    y: ((MAP.north - lat) / (MAP.north - MAP.south)) * MAP.height,
  };
}

export function unproject({ x, y }: Point): { lat: number; lon: number } {
  return {
    lat: MAP.north - (y / MAP.height) * (MAP.north - MAP.south),
    lon: MAP.west + (x / MAP.width) * (MAP.east - MAP.west),
  };
}

const EARTH_RADIUS_KM = 6371;
const KM_PER_DEG_LAT = 111.2;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Great-circle distance in kilometres. */
export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** The point `east` and `north` kilometres away. Good enough for the few hundred kilometres of the map. */
export function offsetKm(from: { lat: number; lon: number }, east: number, north: number): { lat: number; lon: number } {
  return {
    lat: from.lat + north / KM_PER_DEG_LAT,
    lon: from.lon + east / (KM_PER_DEG_LAT * Math.cos(rad(from.lat))),
  };
}

export type Compass = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';
const COMPASS: Compass[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

/** Which of the eight compass points leads from `from` towards `to`. */
export function compassTo(from: { lat: number; lon: number }, to: { lat: number; lon: number }): Compass {
  const east = (to.lon - from.lon) * Math.cos(rad((from.lat + to.lat) / 2));
  const north = to.lat - from.lat;
  const deg = (Math.atan2(east, north) * 180) / Math.PI;
  return COMPASS[Math.round((deg + 360) / 45) % 8]!;
}
