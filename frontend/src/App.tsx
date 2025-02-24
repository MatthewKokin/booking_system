import React, { useState } from 'react';

// Navigation amongst the screens
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';

// Screens
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';

// For styling
import './App.css';

// Images for the example property cards
import cabinImage from './assets/cabin.webp';
import apartmentImage from './assets/nyc.jpg';
import beachHouseImage from './assets/malibu.avif';
import alpsImage from './assets/alps.jpg';
import comoImage from './assets/lakecomo.jpg';
import saImage from './assets/southafrica.jpg';

// For the booking calendar
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Data interface to ensure read in property is of correct format
interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  bookedDates: Date[];
}

const App: React.FC = () => {
  // Track if user is authenticated (Login vs not)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // *** BACKEND API INSERTION POINT! *** (GET PROPERTIES)
  const [properties, setProperties] = useState<Property[]>([ // example property data to show the system working
    { id: 1, title: 'Cozy Cabin in the Woods', location: 'Asheville, NC', price: 120, imageUrl: cabinImage, bookedDates: [] },
    { id: 2, title: 'Modern Apartment in City Center', location: 'New York, NY', price: 250, imageUrl: apartmentImage, bookedDates: []  },
    { id: 3, title: 'Beach House with Ocean View', location: 'Malibu, CA', price: 350, imageUrl: beachHouseImage, bookedDates: []  },
    { id: 4, title: 'Ski Chalet in the Alps', location: 'Alps, FR', price: 500, imageUrl: alpsImage, bookedDates: []  },
    { id: 5, title: 'Luxury villa with Ocean View', location: 'Cape Town, SA', price: 400, imageUrl: saImage, bookedDates: []  },
    { id: 6, title: 'Beautiful Lake Como villa', location: 'Como, IT', price: 350, imageUrl: comoImage, bookedDates: []  }
  ]);

  // Search bar
  const [searchQuery, setSearchQuery] = useState(''); // store the search bar input value
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => { // automatically updates search value when typed
    setSearchQuery(e.target.value);
  };
  const filteredProperties = properties.filter((property) => // filter properties based on search value
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Upload form
  const [showUploadForm, setShowUploadForm] = useState(false); // toggles upload form's visibility

  // *** BACKEND API INSERTION POINT! *** (UPLOAD A NEW PROPERTY)
  const handleUploadProperty = (newProperty: Property) => { // adds uploaded property's data to the list
    setProperties([...properties, { ...newProperty, id: properties.length + 1 }]);
    setShowUploadForm(false);
  };

  // Booking modal
  const [showBookingModal, setShowBookingModal] = useState<number | null>(null); // toggles booking modal's visibility for the currently selected property

  // *** BACKEND API INSERTION POINT! *** (UPLOAD BOOKING FOR SPECIFIC PROPERTY)
  const handleBookProperty = (propertyId: number, dates: Date[]) => { // for updating the calendar dates
    setProperties(properties.map(property =>
      property.id === propertyId ? {
        ...property,
        bookedDates: [...property.bookedDates, ...dates] // add entire range of dates
      } : property
    ));
    setShowBookingModal(null); // close the booking modal after booking
  };

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
              isAuthenticated ? ( // open property screen only if authenticated
                <div>
                  {/* Search bar and Upload button */}
                  <div className="search-bar"> 
                    <input type="text" placeholder="Search properties..." value={searchQuery} onChange={handleSearchChange} />
                    <button onClick={() => setShowUploadForm(!showUploadForm)}>Upload Property</button>
                  </div>

                  {/* Show upload form if boolean set to true */}
                  {showUploadForm && <UploadForm onSubmit={handleUploadProperty} />}
                  
                  {/* Display all properties */}
                  <div className="property-list">
                    {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id} 
                      property={property} 
                      onBook={() => setShowBookingModal(property.id)} /> // pass property to the function to open customised modal
                    ))}
                  </div>

                  {/* Show booking modal if boolean set to true */}
                  {showBookingModal && <BookingModal property={properties.find(p => p.id === showBookingModal)!} onClose={() => setShowBookingModal(null)} onBook={handleBookProperty} />}
                </div>
              ) : (
                <Navigate to="/" replace /> // prevent skipping past security by redirecting to onboarding if not authenticated
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

// Upload form shown when button pressed to upload a new property
const UploadForm: React.FC<{ onSubmit: (property: Property) => void }> = ({ onSubmit }) => {
  // Input field values
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: 0, title, location, price, imageUrl, bookedDates: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
     {/* Input field UI components */}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))} required min="0"  /* Prevents negative numbers */ />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
};

// Booking modal shown when button pressed to book a property
const BookingModal: React.FC<{ property: Property; onClose: () => void; onBook: (propertyId: number, dates: Date[]) => void }> = ({ property, onClose, onBook }) => {
  // Selected date values
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Handle date range change
  const handleDateChange = (dates: Date | [Date, Date]) => {
    if (Array.isArray(dates)) {
      const [startDate, endDate] = dates;
      const rangeDates = getDatesInRange(startDate, endDate); // Get all dates in the range
      setSelectedDates(rangeDates); // Update state with the range of dates
    } else {
      setSelectedDates([dates]); // Single date selection
    }
  };

  // Handle confirm booking
  const handleBook = () => {
    onBook(property.id, selectedDates); // Store the selected date(s) when booking
  };

  // Utility functions for date range handling
  const isInRange = (date: Date) => {
    return selectedDates.some(selectedDate => selectedDate.getTime() === date.getTime());
  };
  
  const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate)); // Add the current date to the range
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
  }

  return dates;
};

  return (
    <div className="booking-modal">
      <div className="modal-content">
        <h2>Book {property.title}</h2>
        <p>Location: {property.location}</p>
        <p>Price per night: ${property.price}</p>
        {/* Calendar for specific property, showing its availability */}
        <Calendar
          selectRange
          onChange={handleDateChange}
          value={selectedDates}
          tileDisabled={({ date }) => property.bookedDates.some(bookedDate => bookedDate.getTime() === date.getTime())}
          tileClassName={({ date }) => {
            if (isInRange(date)) {
                return 'react-calendar__tile--range';
            }
            return null; // else
          }}
        />
        <button onClick={handleBook}>Confirm Booking</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default App;