import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Screens
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import './App.css';

// Import images as placeholders until backend connected
import cabinImage from './assets/cabin.webp';
import apartmentImage from './assets/nyc.jpg';
import beachHouseImage from './assets/malibu.avif';
import alpsImage from './assets/alps.jpg';
import comoImage from './assets/lakecomo.jpg';
import saImage from './assets/southafrica.jpg';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
}

const App: React.FC = () => {
  // Sample Property Data
  const sampleProperties: Property[] = [
    {
      id: 1,
      title: "Cozy Cabin in the Woods",
      location: "Asheville, NC",
      price: 120,
      imageUrl: cabinImage
    },
    {
      id: 2,
      title: "Modern Apartment in City Center",
      location: "New York, NY",
      price: 250,
      imageUrl: apartmentImage
       },
    {
      id: 3,
      title: "Beach House with Ocean View",
      location: "Malibu, CA",
      price: 350,
      imageUrl: beachHouseImage
    }, {
      id: 4,
      title: "Ski Chalet in the Alps",
      location: "Alps, FR",
      price: 500,
      imageUrl: alpsImage
    }, {
      id: 5,
      title: "Luxury villa with Ocean View",
      location: "Cape Town, SA",
      price: 400,
      imageUrl: saImage
    }, {
      id: 6,
      title: "Beautiful Lake Como villa",
      location: "Como, IT",
      price: 350,
      imageUrl: comoImage
    }
  ];

  // State to track user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // *** BACKEND LINK NEEDED HERE *** //
  // const [properties, setProperties] = useState<Property[]>([]);
  // // Fetch properties from backend
  // const fetchProperties = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8080/api/properties");
  //     setProperties(response.data.properties);
  //   } catch (error) {
  //     console.error("Error fetching properties:", error);
  //   }
  // };

  // // Fetch properties on initial render
  // useEffect(() => {
  //   fetchProperties();
  // }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
          <Route 
            path="/properties" 
            element={
              isAuthenticated ? (
                <div className="property-list">
                  {sampleProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        <Footer /> {/* Always at the bottom */}
      </div>
    </Router>
  );
};

export default App;
