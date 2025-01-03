import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <header className="p-5 bg-green-600 text-white">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EcoTrack</h1>
          <Link href="/login">
            <Button variant="outline" className="text-gray-800 border-white hover:bg-green-700">Login</Button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto mt-10 px-4">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Reduce Plastic, Protect Life on Land</h2>
          <p className="text-xl text-green-700 mb-8">Track your plastic usage and make a positive impact on our ecosystems.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <Button className="bg-green-600 hover:bg-green-700">Log Your Plastic Usage</Button>
            </Link>
            <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-100">Learn More</Button>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="/image1.png" alt="Wildlife in natural habitat" width={100} height={48} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-green-700 mb-2">Protect Wildlife</h3>
            <p className="text-gray-600">Reducing plastic waste helps preserve natural habitats and protects countless species from harm.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="/image2.png" alt="Clean ecosystem" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-green-700 mb-2">Preserve Ecosystems</h3>
            <p className="text-gray-600">By minimizing plastic pollution, we contribute to the health and balance of entire ecosystems.</p>
          </div>
        </section>
      </main>

      <footer className="mt-16 bg-green-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 EcoTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

