import Map from './components/Map'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <h1 className="text-6xl font-bold mt-4">Countries Visited 🌍</h1>
      <p className="mt-4">Mark the countries you&apos;ve visited by clicking on them.</p>
      <p>Scroll to zoom. Hover to see country name.</p>
      <div className="h-[80vh]">
        <Map />
      </div>    
    </main>
  );
}
