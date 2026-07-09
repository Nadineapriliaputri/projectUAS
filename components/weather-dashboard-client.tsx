"use client";

import { useEffect, useState } from "react";
import WeatherSidebar from "@/components/weather-sidebar";
import CurrentWeatherSection, {
  type WeatherAlert,
  type WeatherMetric,
} from "@/components/weather-current-section";
import ForecastSection, {
  type ForecastItem,
} from "@/components/weather-forecast-section";

type WeatherViewModel = {
  location: string;
  temperature: string;
  condition: string;
  feelsLike: string;
  minMax: string;
  metrics: WeatherMetric[];
  alerts: WeatherAlert[];
  forecastItems: ForecastItem[];
};

const fallbackWeather: WeatherViewModel = {
  location: "Balikpapan",
  temperature: "29°",
  condition: "Cerah berawan",
  feelsLike: "32°",
  minMax: "27° / 32°",
  metrics: [
    { label: "Kelembapan", value: "78%", note: "Cukup lembap" },
    { label: "Angin", value: "18 km/j", note: "Barat daya" },
    { label: "Tekanan", value: "1009 hPa", note: "Stabil" },
  ],
  alerts: [
    {
      title: "Potensi hujan lokal",
      description: "Diperkirakan turun pada sore hingga malam hari.",
      tone: "warning",
    },
    {
      title: "Pantau petir",
      description: "Aktivitas petir ringan perlu diwaspadai di wilayah selatan.",
      tone: "danger",
    },
  ],
  forecastItems: [
    { time: "08.00", temperature: "28°", label: "Cerah", icon: "sun" },
    { time: "11.00", temperature: "30°", label: "Berawan", icon: "cloud" },
    { time: "14.00", temperature: "31°", label: "Gerah", icon: "sun" },
    { time: "17.00", temperature: "28°", label: "Hujan ringan", icon: "rain" },
    { time: "20.00", temperature: "26°", label: "Mendung", icon: "cloud" },
  ],
};

function readText(source: unknown, path: Array<string | number>): string | null {
  let value: unknown = source;

  for (const key of path) {
    if (value == null) return null;
    if (typeof value === "object" && value !== null) {
      value = (value as Record<string | number, unknown>)[key];
    } else {
      return null;
    }
  }

  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

function normalizeWeather(payload: unknown): WeatherViewModel | null {
  if (!payload || typeof payload !== "object") return null;

  const root = (payload as { data?: unknown }).data ?? payload;
  const location =
    readText(root, ["location", "name"]) ??
    readText(root, ["location", "city"]) ??
    readText(root, ["city"]) ??
    "Balikpapan";

  const temperature =
    readText(root, ["current", "temperature"]) ??
    readText(root, ["current", "temp"]) ??
    readText(root, ["temperature"]) ??
    readText(root, ["suhu"]) ??
    fallbackWeather.temperature;

  const condition =
    readText(root, ["current", "condition"]) ??
    readText(root, ["current", "weather"]) ??
    readText(root, ["condition"]) ??
    readText(root, ["cuaca"]) ??
    fallbackWeather.condition;

  const min =
    readText(root, ["minMax", "min"]) ??
    readText(root, ["current", "min"]) ??
    readText(root, ["min"]) ??
    "27°";

  const max =
    readText(root, ["minMax", "max"]) ??
    readText(root, ["current", "max"]) ??
    readText(root, ["max"]) ??
    "32°";

  const forecast = Array.isArray((root as { forecast?: unknown }).forecast)
    ? ((root as { forecast: Array<Record<string, unknown>> }).forecast ?? []).slice(0, 5).map((item, index) => ({
        time: readText(item, ["time"]) ?? `${8 + index * 3}.00`,
        temperature: readText(item, ["temperature"]) ?? readText(item, ["temp"]) ?? "29°",
        label: readText(item, ["label"]) ?? readText(item, ["condition"]) ?? "Cuaca",
        icon:
          (readText(item, ["icon"]) as ForecastItem["icon"]) ||
          (index === 0 ? "sun" : index === 3 ? "rain" : "cloud"),
      }))
    : fallbackWeather.forecastItems;

  return {
    location,
    temperature,
    condition,
    feelsLike:
      readText(root, ["current", "feelsLike"]) ??
      readText(root, ["feelsLike"]) ??
      fallbackWeather.feelsLike,
    minMax: `${min} / ${max}`,
    metrics: fallbackWeather.metrics,
    alerts: fallbackWeather.alerts,
    forecastItems: forecast,
  };
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 rounded-[30px] bg-white/30 p-4 backdrop-blur-sm sm:p-6">
      <div className="space-y-3">
        <div className="h-4 w-44 rounded-full bg-white/70" />
        <div className="h-8 w-64 rounded-full bg-white/80" />
        <div className="h-4 w-56 rounded-full bg-white/70" />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="h-56 rounded-[30px] bg-white/60" />
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          <div className="h-28 rounded-[26px] bg-white/60" />
          <div className="h-28 rounded-[26px] bg-white/60" />
          <div className="h-28 rounded-[26px] bg-white/60" />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="h-24 rounded-[24px] bg-white/60" />
        <div className="h-24 rounded-[24px] bg-white/60" />
      </div>
    </div>
  );
}

export default function WeatherDashboardClient() {
  const [state, setState] = useState<WeatherViewModel>(fallbackWeather);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/weather?city=Balikpapan", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data BMKG");
        }

        const payload = await response.json();
        const nextState = normalizeWeather(payload);

        if (!nextState) {
          throw new Error("Format data cuaca tidak dikenali");
        }

        setState(nextState);
      } catch {
        if (controller.signal.aborted) return;
        setError("Data BMKG belum tersedia. Menampilkan data sementara Balikpapan.");
        setState(fallbackWeather);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Beranda" location="Balikpapan" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          {loading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {error ? (
                <div className="mb-4 rounded-[24px] border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  {error}
                </div>
              ) : null}

              <CurrentWeatherSection
                title="Cuaca saat ini"
                location={state.location}
                temperature={state.temperature}
                condition={state.condition}
                feelsLike={state.feelsLike}
                minMax={state.minMax}
                metrics={state.metrics}
                alerts={state.alerts}
              />

              <ForecastSection items={state.forecastItems} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
