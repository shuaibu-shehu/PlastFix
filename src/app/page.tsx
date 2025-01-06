'use client'

import { Button } from "@/components/ui/button"
import { signOut, signIn, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/news2.jpg')",
          filter: "brightness(0.6)"
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <header className="p-5 bg-green-400 bg-opacity-80 text-white">
          <nav className="container mx-auto flex justify-between items-center">
            <motion.h1
              className="text-3xl font-bold text-green-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              EcoTrack
            </motion.h1>

            {session ? (
              <Button
                onClick={() => signOut()}
                variant="outline"
                className="text-green-300 border-green-300 hover:bg-green-700 hover:text-white transition-colors duration-300"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                variant="outline"
                className="text-green-300 border-green-300 hover:bg-green-700 hover:text-white transition-colors duration-300"
              >
                Login
              </Button>
            )}
          </nav>
        </header>

        <main className="container mx-auto mt-20 px-4">
          <section className="text-center">
            <motion.div
              className="mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="max-w-3xl mx-auto">
                <motion.h1
                  className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Your Path to a
                  <br />
                  <span className="text-green-300">Greener Future</span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium drop-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Empower yourself to make a difference. Track, analyze, and reduce
                  your plastic footprint with our intuitive web tool.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Button
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="bg-green-400 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className=" mt-24 button sticky bg-green-400 bg-opacity-80 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 EcoTrack. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

