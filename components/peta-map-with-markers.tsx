"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { laporanData } from "@/lib/laporan-data";

/* ─── colored marker icon ────────────────────────────────────────────────── */

function createMarkerIcon(jenisBencana: "Banjir" | "Angin Kencang") {
  const color = jenisBencana === "Banjir" ? "#3b82f6" : "#eab308";
  const label = jenisBencana === "Banjir" ? "\u{1F30A}" : "\u{1F32A}\uFE0F";

  return L.divIcon({
    className: "",
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
    html: `
      <div style="
        position:relative;
        width:36px;
        height:44px;
        display:flex;
        align-items:flex-end;
        justify-content:center;
        filter:drop-shadow(0 2px 4px rgba(0,0,0,.25));
      ">
        <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.06 0 0 8.06 0 18c0 12.6 18 26 18 26s18-13.4 18-26C36 8.06 27.94 0 18 0z"
                fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="18" cy="18" r="9" fill="white" opacity=".9"/>
          <text x="18" y="23" text-anchor="middle" font-size="14">${label}</text>
        </svg>
      </div>
    `,
  });
}

/* ─── main component ─────────────────────────────────────────────────────── */

const center: [number, number] = [-1.2379, 116.8529];

export default function PetaMapWithMarkers() {
  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "520px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {laporanData.map((laporan) => (
        <Marker
          key={laporan.id}
          position={[laporan.latitude, laporan.longitude]}
          icon={createMarkerIcon(laporan.jenisBencana)}
        >
          <Popup maxWidth={300} className="siaga-popup">
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  marginBottom: 6,
                  color: "#1e293b",
                }}
              >
                {laporan.namaLokasi}
              </p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ color: "#64748b", paddingRight: 8, whiteSpace: "nowrap" }}>Jenis</td>
                    <td style={{ fontWeight: 600 }}>{laporan.jenisBencana}</td>
                  </tr>
                  <tr>
                    <td style={{ color: "#64748b", paddingRight: 8 }}>Keparahan</td>
                    <td style={{ fontWeight: 600 }}>{laporan.tingkatKeparahan}</td>
                  </tr>
                  <tr>
                    <td style={{ color: "#64748b", paddingRight: 8 }}>Status</td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "1px 8px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 600,
                          backgroundColor:
                            laporan.status === "Terverifikasi"
                              ? "#dcfce7"
                              : "#fef9c3",
                          color:
                            laporan.status === "Terverifikasi"
                              ? "#166534"
                              : "#854d0e",
                        }}
                      >
                        {laporan.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "#64748b", paddingRight: 8 }}>Waktu</td>
                    <td>{laporan.waktuLaporan}</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ marginTop: 8, color: "#475569" }}>
                {laporan.deskripsi}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
