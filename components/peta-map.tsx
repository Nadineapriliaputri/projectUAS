"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

const center: [number, number] = [-1.2379, 116.8529];

export default function PetaMap() {
  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{
        height: "520px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={center}>
        <Popup>
          Balikpapan - Lokasi Pantau
        </Popup>
      </Marker>
    </MapContainer>
  );
}
