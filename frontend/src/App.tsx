import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState<number | null>(null);
  const [properties, setProperties] = useState<Property[]>([
    { id: 1, title: 'Cozy Cabin in the Woods', location: 'Asheville, NC', price: 120, imageUrl: cabinImage },
    { id: 2, title: 'Modern Apartment in City Center', location: 'New York, NY', price: 250, imageUrl: apartmentImage },
    { id: 3, title: 'Beach House with Ocean View', location: 'Malibu, CA', price: 350, imageUrl: beachHouseImage },
    { id: 4, title: 'Ski Chalet in the Alps', location: 'Alps, FR', price: 500, imageUrl: alpsImage },
    { id: 5, title: 'Luxury villa with Ocean View', location: 'Cape Town, SA', price: 400, imageUrl: saImage },
    { id: 6, title: 'Beautiful Lake Como villa', location: 'Como, IT', price: 350, imageUrl: comoImage }
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUploadProperty = (newProperty: Property) => {
    setProperties([...properties, { ...newProperty, id: properties.length + 1 }]);
    setShowUploadForm(false);
  };

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <div>
                  <div className="search-bar">
                    <input type="text" placeholder="Search properties..." value={searchQuery} onChange={handleSearchChange} />
                    <button onClick={() => setShowUploadForm(!showUploadForm)}>Upload Property</button>
                  </div>
                  {showUploadForm && <UploadForm onSubmit={handleUploadProperty} />}
                  <div className="property-list">
                    {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id} 
                      property={property} 
                      onBook={() => setShowBookingModal(property.id)} /> // Pass function to open modal
                    ))}
                  </div>
                  {showBookingModal && <BookingModal property={properties.find(p => p.id === showBookingModal)!} onClose={() => setShowBookingModal(null)} />}
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const UploadForm: React.FC<{ onSubmit: (property: Property) => void }> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: 0, title, location, price, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
};

const BookingModal: React.FC<{ property: Property; onClose: () => void }> = ({ property, onClose }) => {
  return (
    <div className="booking-modal">
      <h2>Book {property.title}</h2>
      <p>Location: {property.location}</p>
      <p>Price per night: ${property.price}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default App;