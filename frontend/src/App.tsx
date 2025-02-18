import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import './App.css';

// Import images as placeholders until backend connected
import cabinImage from './assets/cabin.webp';
import apartmentImage from './assets/nyc.jpg';
import beachHouseImage from './assets/malibu.avif';


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
    }
  ];

  // Use state to manage property list
  const [properties] = useState<Property[]>(sampleProperties);

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
    <div className="App">
      <Navbar />
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
