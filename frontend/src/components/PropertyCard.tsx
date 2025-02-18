import React from 'react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
}

interface Props {
  property: Property;
}

const PropertyCard: React.FC<Props> = ({ property }) => {
  return (
    <div className="property-card">
      <div className="image-wrapper">
        <img src={property.imageUrl} alt={property.title} />
      </div>
      <div className="property-info">
        <h2>{property.title}</h2>
        <p>{property.location}</p>
        <p className="price">${property.price} / night</p>
      </div>
    </div>
  );
};

export default PropertyCard;
