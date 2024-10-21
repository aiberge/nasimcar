'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Briefcase, Settings, Mail, Phone, Copy, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/public/logocar.png'
import dynamic from 'next/dynamic'

interface Car {
  id: number;
  name: string;
  seats: number;
  luggage: number;
  transmission: string;
  price: number;
  unlimited: boolean;
  type: string;
  location: string;
  ac: boolean;
  image: string;
  speed: number;
  trunk: number;
}

const cars = [
  { id: 1, name: 'Kia Picanto', seats: 4, luggage: 1, transmission: 'Manuelle', price: 250, unlimited: true, type: 'Économique', location: 'Oujda', ac: true, image: '/picanto_5_door_lrg (1).jpg', speed: 160, trunk: 200 },
  { id: 2, name: 'Toyota Yaris', seats: 5, luggage: 2, transmission: 'Automatique', price: 300, unlimited: true, type: 'Économique', location: 'Berkane', ac: true, image: '/picanto_5_door_lrg.jpg', speed: 180, trunk: 280 },
  { id: 3, name: 'Renault Clio', seats: 5, luggage: 2, transmission: 'Manuelle', price: 280, unlimited: false, type: 'Économique', location: 'Nador', ac: true, image: '/duster_lrg.jpg', speed: 170, trunk: 300 },
  { id: 4, name: 'Peugeot 308', seats: 5, luggage: 3, transmission: 'Automatique', price: 350, unlimited: true, type: 'Compacte', location: 'Oujda', ac: true, image: '/duster_lrg.jpg', speed: 200, trunk: 420 },
  { id: 5, name: 'Volkswagen Golf', seats: 5, luggage: 2, transmission: 'Manuelle', price: 320, unlimited: true, type: 'Compacte', location: 'Berkane', ac: true, image: '/duster_lrg.jpg', speed: 210, trunk: 380 },
  { id: 6, name: 'Ford Focus', seats: 5, luggage: 2, transmission: 'Automatique', price: 330, unlimited: false, type: 'Compacte', location: 'Nador', ac: true, image: '/picanto_5_door_lrg (1).jpg', speed: 195, trunk: 375 },
  { id: 7, name: 'Hyundai Tucson', seats: 5, luggage: 4, transmission: 'Automatique', price: 400, unlimited: true, type: 'SUV', location: 'Oujda', ac: true, image: '/duster_lrg.jpg', speed: 180, trunk: 620 },
  { id: 8, name: 'Nissan Qashqai', seats: 5, luggage: 3, transmission: 'Manuelle', price: 380, unlimited: true, type: 'SUV', location: 'Berkane', ac: true, image: '/carens_lrg.jpg', speed: 190, trunk: 580 },
  { id: 9, name: 'Renault Captur', seats: 5, luggage: 2, transmission: 'Automatique', price: 340, unlimited: false, type: 'SUV', location: 'Nador', ac: true, image: '/duster_lrg.jpg', speed: 175, trunk: 450 },
  { id: 10, name: 'Mercedes Classe C', seats: 5, luggage: 2, transmission: 'Automatique', price: 500, unlimited: true, type: 'Luxe', location: 'Oujda', ac: true, image: '/duster_lrg.jpg', speed: 250, trunk: 480 },
  { id: 11, name: 'BMW Série 3', seats: 5, luggage: 2, transmission: 'Automatique', price: 520, unlimited: true, type: 'Luxe', location: 'Berkane', ac: true, image: '/carens_lrg.jpg', speed: 250, trunk: 480 },
  { id: 12, name: 'Audi A4', seats: 5, luggage: 2, transmission: 'Automatique', price: 510, unlimited: true, type: 'Luxe', location: 'Nador', ac: true, image: '/duster_lrg.jpg', speed: 250, trunk: 460 },
  { id: 13, name: 'Fiat 500', seats: 4, luggage: 1, transmission: 'Manuelle', price: 240, unlimited: false, type: 'Économique', location: 'Oujda', ac: false, image: '/picanto_5_door_lrg (1).jpg', speed: 160, trunk: 185 },
  { id: 14, name: 'Opel Corsa', seats: 5, luggage: 2, transmission: 'Manuelle', price: 260, unlimited: true, type: 'Économique', location: 'Berkane', ac: true, image: '/duster_lrg.jpg', speed: 170, trunk: 285 },
  { id: 15, name: 'Dacia Duster', seats: 5, luggage: 3, transmission: 'Manuelle', price: 290, unlimited: true, type: 'SUV', location: 'Nador', ac: true, image: '/picanto_5_door_lrg (1).jpg', speed: 180, trunk: 475 },
]

const MapWithNoSSR = dynamic(() => import('@/components/ui/Map'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
})

export function NassimCarWebsite() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedFilters, setSelectedFilters] = useState({ type: '', ac: false })
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [showReservationConfirmation, setShowReservationConfirmation] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  const filteredCars = cars.filter(car => {
    return (
      (selectedFilters.type === '' || car.type === selectedFilters.type) &&
      (!selectedFilters.ac || car.ac)
    )
  })

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const openCarDetails = (car: Car) => {
    setSelectedCar(car)
  }

  const closeCarDetails = () => {
    setSelectedCar(null)
  }

  const handleReservation = () => {
    setShowReservationConfirmation(true)
  }

  const closeReservationConfirmation = () => {
    setShowReservationConfirmation(false)
  }

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+212 5 36 12 34 56')
    toast.success('Numéro de téléphone copié!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  // Add this debugging code inside the NassimCarWebsite component, just before the return statement
  useEffect(() => {
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Base URL:', process.env.NEXT_PUBLIC_BASE_URL);
    // Log any other relevant environment variables
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
        <div className="flex items-center">
          <Image src={Logo} alt="San Diego Car's Logo" width={120} height={120} className="mr-2" />
        </div>
        <div className="space-x-4">
          <button
            className={`text-lg ${currentPage === 'home' ? 'text-red-600' : 'text-white'}`}
            onClick={() => setCurrentPage('home')}
          >
            Accueil
          </button>
          <button
            className={`text-lg ${currentPage === 'about' ? 'text-red-600' : 'text-white'}`}
            onClick={() => setCurrentPage('about')}
          >
            À Propos
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <section className="relative h-screen">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-red-900 animate-gradient-x"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                <h2 className="text-5xl font-bold mb-8 text-white">Bienvenue chez <span className="text-[#FC0F1D]">San Diego Car's</span></h2>
                <button
                  className="bg-red-600 text-white px-8 py-3 rounded-full text-xl hover:bg-red-700 transition duration-300"
                  onClick={() => {
                    const catalogElement = document.getElementById('catalog')
                    if (catalogElement) {
                      catalogElement.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  Voir les voitures
                </button>
              </div>
            </section>

            <section id="catalog" className="py-16 px-4 md:px-8 bg-gray-900">
              <h2 className="text-3xl font-bold mb-8 text-center">Notre Catalogue</h2>
              
              <div className="w-full h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
                <MapWithNoSSR selectedLocation={null} />
              </div>

              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/4 mb-8 md:mb-0">
                  <h3 className="text-xl font-semibold mb-4">Filtres</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">Type de véhicule</label>
                      <select
                        className="w-full bg-gray-800 p-2 rounded"
                        value={selectedFilters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                      >
                        <option value="">Tous</option>
                        <option value="Économique">Économique</option>
                        <option value="Compacte">Compacte</option>
                        <option value="SUV">SUV</option>
                        <option value="Luxe">Luxe</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-red-600"
                          checked={selectedFilters.ac}
                          onChange={(e) => handleFilterChange('ac', e.target.checked)}
                        />
                        <span className="ml-2">Climatisation</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold">Résultats: {filteredCars.length} voiture(s)</p>
                  </div>
                </div>
                <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCars.map((car) => (
                    <motion.div 
                      key={car.id}
                      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="h-48 relative"> {/* Increased height from h-32 to h-48 */}
                        <Image src={car.image} alt={car.name} layout="fill" objectFit="cover" quality={100} />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Users className="w-5 h-5 mr-1" />
                            <span>{car.seats}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-5 h-5 mr-1" />
                            <span>{car.luggage}</span>
                          </div>
                          <div className="flex items-center">
                            <Settings className="w-5 h-5 mr-1" />
                            <span>{car.transmission}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-bold">{car.price} MAD / jour</span>
                          {car.unlimited && (
                            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                              Kilométrage illimité
                            </span>
                          )}
                        </div>
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700"
                          onClick={() => openCarDetails(car)}
                        >
                          Voir l'offre
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {currentPage === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-20 px-4 md:px-8 bg-gray-900"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">À Propos de San Diego Car's</h2>
              <div className="mb-12 relative overflow-hidden rounded-lg">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/SZgr1hBbFDo?si=goh2WWKN6V_qsUOI"
                  title="Nassim Car Presentation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">Notre Mission</h3>
                  <p className="text-gray-300">
                    Chez San Diego Car's, notre mission est de fournir une expérience de location de voiture exceptionnelle,
                    alliant confort, flexibilité et service client de premier ordre.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">Notre Vision</h3>
                  <p className="text-gray-300">
                    Nous aspirons à devenir le leader incontesté de la location de voitures au Maroc, en offrant une
                    flotte moderne et écologique, tout en privilégiant l'innovation et la satisfaction client.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">Pourquoi choisir Nassim Car ?</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Flotte de véhicules récents et bien entretenus</li>
                    <li>Options flexibles de location</li>
                    <li>Service client disponible 24/7</li>
                    <li>Tarifs compétitifs et transparents</li>
                    <li>Présence dans les principales villes de l&apos;Oriental marocain</li>
                  </ul>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12"
              >
                <h3 className="text-2xl font-semibold mb-4">Contactez-Nous</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Nos Bureaux</h4>
                    <p className="text-gray-300">
                      123 Main Street<br />
                      San Diego, CA 92101<br />
                      États-Unis
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-red-600" />
                        <span>+1 (619) 123-4567</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-red-600" />
                        <span>contact@sandiegocars.com</span>
                      </div>
                    </div>
                  </div>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full bg-gray-800 p-2 rounded"
                    />
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full bg-gray-800 p-2 rounded"
                    />
                    <textarea
                      placeholder="Votre message"
                      rows={4}
                      className="w-full bg-gray-800 p-2 rounded"
                    ></textarea>
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                      Envoyer
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-gray-900 text-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold text-red-600 mb-2">San Diego Car's</h3>
            <p className="text-sm">La meilleure expérience de location de <span className="font-bold text-red-600">voitures</span> à San Diego</p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/p/San-Diego-Cars-Location-De-Voitures-100093187363844/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/SanDiego_Cars_48" className="text-white hover:text-red-600 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-red-600 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 San Diego Car's. Tous droits réservés.</p>
        </div>
      </footer>

      <Dialog open={!!selectedCar} onOpenChange={closeCarDetails}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedCar?.name}</DialogTitle>
            <DialogDescription>
              <div className="mt-4 relative h-64 rounded-lg overflow-hidden">
                {selectedCar && (
                  <Image 
                    src={selectedCar.image} 
                    alt={selectedCar.name} 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Type:</p>
                  <p>{selectedCar?.type}</p>
                </div>
                <div>
                  <p className="font-semibold">Transmission:</p>
                  <p>{selectedCar?.transmission}</p>
                </div>
                <div>
                  <p className="font-semibold">Sièges:</p>
                  <p>{selectedCar?.seats}</p>
                </div>
                <div>
                  <p className="font-semibold">Bagages:</p>
                  <p>{selectedCar?.luggage}</p>
                </div>
                <div>
                  <p className="font-semibold">Climatisation:</p>
                  <p>{selectedCar?.ac ? 'Oui' : 'Non'}</p>
                </div>
                <div>
                  <p className="font-semibold">Kilométrage:</p>
                  <p>{selectedCar?.unlimited ? 'Illimité' : 'Limité'}</p>
                </div>
                <div>
                  <p className="font-semibold">Vitesse max:</p>
                  <p>{selectedCar?.speed} km/h</p>
                </div>
                <div>
                  <p className="font-semibold">Taille du coffre:</p>
                  <p>{selectedCar?.trunk} L</p>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-2xl font-bold">{selectedCar?.price} MAD / jour</p>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleReservation}>
                  Réserver
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showReservationConfirmation} onOpenChange={closeReservationConfirmation}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confirmation de réservation</DialogTitle>
            <DialogDescription>
              <p className="mt-4">Merci d'avoir choisi <span className="text-red-600 font-bold">San Diego Car's</span> pour votre location de voiture.</p>
              <p className="mt-2">Pour finaliser votre réservation, veuillez nous contacter par l'un des moyens suivants :</p>
              <div className="mt-6 space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => window.open('https://wa.me/212536123456', '_blank')}>
                  <MessageCircle className="mr-2" />
                  Contacter sur WhatsApp
                </Button>
                <div className="flex items-center space-x-2">
                  <Button className="flex-grow bg-blue-600 hover:bg-blue-700">
                    <Phone className="mr-2" />
                    +212 5 36 12 34 56
                  </Button>
                  <Button className="bg-gray-700 hover:bg-gray-600" onClick={copyPhoneNumber}>
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  )
}

export default NassimCarWebsite;
