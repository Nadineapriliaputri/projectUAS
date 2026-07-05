"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, CircleMarker, Popup, TileLayer } from "react-leaflet";

type MapPoint = {
  id: string;
  label: string;
  type: "flood" | "wind" | "balikpapan";
  position: [number, number];
  color: string;
};

const center: [number, number] = [-1.2379, 116.8529];

const points: MapPoint[] = [
  {
    id: "balikpapan",
    label: "Balikpapan",
    type: "balikpapan",
    position: [-1.2379, 116.8529],
    color: "#22c55e",
  },
  {
    id: "flood-1",
    label: "Titik banjir dummy",
    type: "flood",
    position: [-1.225, 116.87],
    color: "#0ea5e9",
  },
  {
    id: "wind-1",
    label: "Titik angin kencang dummy",
    type: "wind",
    position: [-1.255, 116.835],
    color: "#f59e0b",
  },
];

export default function WeatherMap() {
  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((point) => (
        <CircleMarker
          key={point.id}
          center={point.position}
          radius={point.type === "balikpapan" ? 10 : 8}
          pathOptions={{
            color: point.color,
            fillColor: point.color,
            fillOpacity: point.type === "balikpapan" ? 0.9 : 0.55,
            weight: point.type === "balikpapan" ? 3 : 2,
          }}
        >
          <Popup>{point.label}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
