USE booking_system;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    create_date DATE NOT NULL,
    last_login DATE,
    profile_pic_url VARCHAR(255),
    phone VARCHAR(20),
    bio TEXT
);

INSERT INTO users (username, email, password, create_date, last_login, profile_pic_url, phone, bio)
VALUES 
    ('UserOne', 'userone@example.com', 'password123', '2023-01-01', '2023-02-01', 'http://example.com/images/userone.jpg', '123-456-7890', 'Love to travel and explore new places!'),
    ('UserTwo', 'usertwo@example.com', 'password456', '2023-01-02', '2023-02-02', 'http://example.com/images/usertwo.jpg', '234-567-8901', 'Adventurous foodie trying new cuisines.'),
    ('UserThree', 'userthree@example.com', 'password789', '2023-01-03', '2023-02-03', 'http://example.com/images/userthree.jpg', '345-678-9012', 'Digital nomad blogging my travels.'),
    ('UserFour', 'userfour@example.com', 'password012', '2023-01-04', '2023-02-04', 'http://example.com/images/userfour.jpg', '456-789-0123', 'Photographer capturing life\'s moments.'),
    ('UserFive', 'userfive@example.com', 'password234', '2023-01-05', '2023-02-05', 'http://example.com/images/userfive.jpg', '567-890-1234', 'Fitness enthusiast and gym coach.'),
    ('UserSix', 'usersix@example.com', 'password345', '2023-01-06', '2023-02-06', 'http://example.com/images/usersix.jpg', '678-901-2345', 'History buff visiting historic sites.'),
    ('UserSeven', 'userseven@example.com', 'password456', '2023-01-07', '2023-02-07', 'http://example.com/images/userseven.jpg', '789-012-3456', 'Gardener sharing plant care tips.'),
    ('UserEight', 'usereight@example.com', 'password567', '2023-01-08', '2023-02-08', 'http://example.com/images/usereight.jpg', '890-123-4567', 'Tech enthusiast and gadget reviewer.'),
    ('UserNine', 'usernine@example.com', 'password678', '2023-01-09', '2023-02-09', 'http://example.com/images/usernine.jpg', '901-234-5678', 'Chef at home, sharing my recipes.'),
    ('UserTen', 'userten@example.com', 'password789', '2023-01-10', '2023-02-10', 'http://example.com/images/userten.jpg', '012-345-6789', 'World traveler and language learner.');
    
CREATE TABLE properties (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    host_id INT,
    title VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    price_per_night DECIMAL(10, 2),
    max_guests INT,
    type VARCHAR(100),
    bedrooms INT,
    bathrooms DECIMAL(3,1),
    is_active BOOLEAN,
    FOREIGN KEY (host_id) REFERENCES users(user_id)
);

INSERT INTO properties (host_id, title, description, location, price_per_night, max_guests, type, bedrooms, bathrooms, is_active)
VALUES
    (1, 'Cozy Cottage', 'A charming cottage in the countryside.', 'Countryside, England', 150.00, 4, 'Entire place', 2, 1.5, TRUE),
    (2, 'Urban Flat', 'Modern flat with city views and close to downtown.', 'Downtown, New York', 200.00, 2, 'Entire place', 1, 1.0, TRUE),
    (3, 'Beachside Bungalow', 'A beachside bungalow with sunset views.', 'Malibu, California', 300.00, 6, 'Entire place', 3, 2.0, TRUE),
    (4, 'Ski Lodge', 'Cozy lodge near the ski slopes with hot tub.', 'Aspen, Colorado', 400.00, 8, 'Entire place', 4, 3.5, TRUE),
    (5, 'Downtown Studio', 'Compact studio in the heart of the city.', 'Chicago, Illinois', 100.00, 2, 'Private room', 0, 1.0, TRUE),
    (6, 'Country House', 'Spacious house perfect for large families.', 'Countryside, France', 180.00, 5, 'Entire place', 3, 2.0, TRUE),
    (7, 'Lakeside Cabin', 'Rustic cabin right by the lake.', 'Lake Tahoe, California', 250.00, 4, 'Entire place', 2, 1.0, TRUE),
    (8, 'City Apartment', 'High-rise apartment with panoramic city views.', 'Manhattan, New York', 275.00, 3, 'Entire place', 2, 2.0, TRUE),
    (9, 'Private Villa', 'Luxurious private villa with a pool.', 'Miami, Florida', 500.00, 7, 'Entire place', 4, 3.0, TRUE),
    (10, 'Suburban Home', 'Comfortable family home in a quiet suburb.', 'Suburb, California', 220.00, 5, 'Entire place', 3, 2.5, TRUE);

CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT,
    guest_id INT,
    start_date DATE,
    end_date DATE,
    total_price DECIMAL(10, 2),
    status ENUM('Pending', 'Confirmed', 'Cancelled'),
    FOREIGN KEY (listing_id) REFERENCES properties(property_id),
    FOREIGN KEY (guest_id) REFERENCES users(user_id)
);

INSERT INTO bookings (listing_id, guest_id, start_date, end_date, total_price, status)
VALUES
    (1, 2, '2023-07-10', '2023-07-15', 750.00, 'Confirmed'),
    (2, 3, '2023-08-01', '2023-08-05', 1000.00, 'Confirmed'),
    (3, 4, '2023-09-15', '2023-09-20', 1500.00, 'Pending'),
    (4, 5, '2023-10-01', '2023-10-03', 1200.00, 'Cancelled'),
    (5, 6, '2023-11-20', '2023-11-25', 500.00, 'Confirmed'),
    (6, 7, '2023-12-05', '2023-12-10', 900.00, 'Confirmed'),
    (7, 8, '2024-01-01', '2024-01-03', 500.00, 'Pending'),
    (8, 9, '2024-02-14', '2024-02-20', 1650.00, 'Confirmed'),
    (9, 10, '2024-03-10', '2024-03-15', 2500.00, 'Confirmed'),
    (10, 1, '2024-04-05', '2024-04-12', 1760.00, 'Pending');

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    rating TINYINT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    comment TEXT,
    create_date DATE,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

INSERT INTO reviews (booking_id, rating, comment, create_date)
VALUES
    (1, 5, 'Absolutely fantastic stay! Highly recommend.', '2023-07-16'),
    (2, 4, 'Very good place, but the room was slightly chilly.', '2023-08-06'),
    (3, 3, 'Average experience, expected a bit more for the price.', '2023-09-21'),
    (4, 2, 'Somewhat disappointed with the amenities provided.', '2023-10-04'),
    (5, 1, 'Unsatisfactory! The host was rude and the place was dirty.', '2023-11-26'),
    (6, 4, 'Great location and nice views, but the bed was uncomfortable.', '2023-12-11'),
    (7, 5, 'Perfect weekend getaway, would come back again!', '2024-01-04'),
    (8, 3, 'Decent stay but overpriced for what it offers.', '2024-02-21'),
    (9, 5, 'An amazing experience, the host was incredibly hospitable.', '2024-03-16'),
    (10, 4, 'Very clean and well-organized, just lacked some basic kitchen items.', '2024-04-13');

