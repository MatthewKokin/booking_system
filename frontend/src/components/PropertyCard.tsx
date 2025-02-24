import React from 'react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  bookedDates: Date[];
}

interface Props {
  property: Property;
  onBook: () => void;
}

const PropertyCard: React.FC<Props> = ({ property, onBook }) => {
  return (
    <div className="property-card">
      <div className="image-wrapper">
        <img src={property.imageUrl} alt={property.title} />
      </div>
      <div className="property-info">
        <h2>{property.title}</h2>
        <p>{property.location}</p>
        <p className="price">${property.price} / night</p>
        {/* Wrapper for the book button */}
        <div className="book-button-wrapper">
          <button onClick={onBook}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
