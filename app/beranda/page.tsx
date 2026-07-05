import WeatherSidebar from "@/components/weather-sidebar";
import CurrentWeatherSection, {
  type WeatherAlert,
  type WeatherMetric,
} from "@/components/weather-current-section";
import ForecastSection, { type ForecastItem } from "@/components/weather-forecast-section";

const metrics: WeatherMetric[] = [
  { label: "Kelembapan", value: "78%", note: "Cukup lembap" },
  { label: "Angin", value: "18 km/j", note: "Barat daya" },
  { label: "Tekanan", value: "1009 hPa", note: "Stabil" },
];

const alerts: WeatherAlert[] = [
  {
    title: "Potensi hujan lokal",
    description: "Kemungkinan turun pada sore hingga malam hari.",
    tone: "warning",
  },
  {
    title: "Pantau petir",
    description: "Aktivitas petir ringan perlu diwaspadai di wilayah selatan.",
    tone: "danger",
  },
];

const forecastItems: ForecastItem[] = [
  { time: "09.00", temperature: "29°", label: "Cerah", icon: "sun" },
  { time: "12.00", temperature: "31°", label: "Cerah", icon: "sun" },
  { time: "15.00", temperature: "30°", label: "Berawan", icon: "cloud" },
  { time: "18.00", temperature: "27°", label: "Hujan ringan", icon: "rain" },
  { time: "21.00", temperature: "24°", label: "Malam cerah", icon: "moon" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Dashboard" location="Balikpapan" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          <CurrentWeatherSection
            title="Cuaca saat ini"
            location="Balikpapan"
            temperature="29°C"
            condition="Cerah"
            feelsLike="31°C"
            minMax="24°C / 33°C"
            metrics={metrics}
            alerts={alerts}
          />

          <ForecastSection items={forecastItems} />
        </div>
      </div>
    </main>
  );
}
