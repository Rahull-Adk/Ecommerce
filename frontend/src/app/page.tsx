import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="w-full bg-support_primary">
      <Navbar />
      <Hero />
    </div>
  );
}
