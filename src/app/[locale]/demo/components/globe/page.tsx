import Globe from "@/components/misc/Globe";

export default function GlobePage() {
  return (
    <div>
      <h1>GlobePage</h1>
      <Globe
        width={400}
        height={400}
        markerArray={[
          { latitude: 40.7128, longitude: -74.006 }, // New York
          { latitude: 51.5074, longitude: -0.1278 }, // London
        ]}
        isDraggable={true}
        glowColor="#0ea5e9"
      />
    </div>
  );
}
