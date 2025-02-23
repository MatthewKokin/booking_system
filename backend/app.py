from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
cors= CORS(app, origins="*")

con = mysql.connector.connect(
    host = 'mysql-compose-container',
    user = 'root',
    password = 'password',
    database = 'booking_system',
    port = "3306"
)

@app.route('/api/users', methods=['GET'])
def users():
    try:
        cursor = con.cursor(dictionary=True)  # Use dictionary cursor to directly fetch the results as dictionaries.
        cursor.execute('SELECT * FROM property')
        rows = cursor.fetchall()
        
        if rows:
            return jsonify(rows), 200
        else:
            return jsonify({"message": "No users found."}), 404
        
    except Error as e:
        print("Error reading data from MySQL table", e)
        return jsonify({"error": str(e)}), 500
    
    finally:
        if (con.is_connected()):
            cursor.close()
            con.close()
            print("MySQL connection is closed")

if __name__ == '__main__':
    app.run(debug=True, port=8080)


'''
1. Users
- UserID (Primary Key)
- Username
- Email
- Password
- CreateDate
- LastLogin
- ProfilePicURL
- Phone
- Bio

2. Property
- property_id (Primary Key)
- host_id (Foreign Key from Users)
- title
- description
- location
- price_per_night
- max_guests
- type (e.g., Entire place, Private room)
- bedrooms
- bathrooms
- is_active (Boolean)

3. Bookings
- booking_id (Primary Key)
- listing_id (Foreign Key from Properties)
- guest_id (Foreign Key from Users)
- start_date
- end_date
- total_price
- status (e.g., Pending, Confirmed, Cancelled)

4. Reviews
- ReviewID (Primary Key)
- BookingID (Foreign Key from Bookings)
- Rating (scale of 1-5)
- Comment
- CreateDate

5. Property Images
- ImageID (Primary Key)
- PropertyID (Foreign Key from Properties)
- ImageUrl
- Description

6. Amenities
- AmenityID (Primary Key)
- Name
- Description

7. Property_Amenities (Join Table for Properties and Amenities)
- PropertyID (Foreign Key)
- AmenityID (Foreign Key)

8. Payments
- PaymentID (Primary Key)
- BookingID (Foreign Key from Bookings)
- Amount
- PaymentDate
- PaymentMethod (e.g., Credit Card, PayPal)
'''

usersArray = [
  {
    "UserID": 1,
    "Username": "UserOne",
    "Email": "userone@example.com",
    "Password": "password123",
    "CreateDate": "2023-01-01",
    "LastLogin": "2023-02-01",
    "ProfilePicURL": "http://example.com/images/userone.jpg",
    "Phone": "123-456-7890",
    "Bio": "Love to travel and explore new places!"
  },
  {
    "UserID": 2,
    "Username": "UserTwo",
    "Email": "usertwo@example.com",
    "Password": "password456",
    "CreateDate": "2023-01-02",
    "LastLogin": "2023-02-02",
    "ProfilePicURL": "http://example.com/images/usertwo.jpg",
    "Phone": "234-567-8901",
    "Bio": "Adventurous foodie trying new cuisines."
  },
  {
    "UserID": 3,
    "Username": "UserThree",
    "Email": "userthree@example.com",
    "Password": "password789",
    "CreateDate": "2023-01-03",
    "LastLogin": "2023-02-03",
    "ProfilePicURL": "http://example.com/images/userthree.jpg",
    "Phone": "345-678-9012",
    "Bio": "Digital nomad blogging my travels."
  },
  {
    "UserID": 4,
    "Username": "UserFour",
    "Email": "userfour@example.com",
    "Password": "password012",
    "CreateDate": "2023-01-04",
    "LastLogin": "2023-02-04",
    "ProfilePicURL": "http://example.com/images/userfour.jpg",
    "Phone": "456-789-0123",
    "Bio": "Photographer capturing life's moments."
  },
  {
    "UserID": 5,
    "Username": "UserFive",
    "Email": "userfive@example.com",
    "Password": "password234",
    "CreateDate": "2023-01-05",
    "LastLogin": "2023-02-05",
    "ProfilePicURL": "http://example.com/images/userfive.jpg",
    "Phone": "567-890-1234",
    "Bio": "Fitness enthusiast and gym coach."
  },
  {
    "UserID": 6,
    "Username": "UserSix",
    "Email": "usersix@example.com",
    "Password": "password345",
    "CreateDate": "2023-01-06",
    "LastLogin": "2023-02-06",
    "ProfilePicURL": "http://example.com/images/usersix.jpg",
    "Phone": "678-901-2345",
    "Bio": "History buff visiting historic sites."
  },
  {
    "UserID": 7,
    "Username": "UserSeven",
    "Email": "userseven@example.com",
    "Password": "password456",
    "CreateDate": "2023-01-07",
    "LastLogin": "2023-02-07",
    "ProfilePicURL": "http://example.com/images/userseven.jpg",
    "Phone": "789-012-3456",
    "Bio": "Gardener sharing plant care tips."
  },
  {
    "UserID": 8,
    "Username": "UserEight",
    "Email": "usereight@example.com",
    "Password": "password567",
    "CreateDate": "2023-01-08",
    "LastLogin": "2023-02-08",
    "ProfilePicURL": "http://example.com/images/usereight.jpg",
    "Phone": "890-123-4567",
    "Bio": "Tech enthusiast and gadget reviewer."
  },
  {
    "UserID": 9,
    "Username": "UserNine",
    "Email": "usernine@example.com",
    "Password": "password678",
    "CreateDate": "2023-01-09",
    "LastLogin": "2023-02-09",
    "ProfilePicURL": "http://example.com/images/usernine.jpg",
    "Phone": "901-234-5678",
    "Bio": "Chef at home, sharing my recipes."
  },
  {
    "UserID": 10,
    "Username": "UserTen",
    "Email": "userten@example.com",
    "Password": "password789",
    "CreateDate": "2023-01-10",
    "LastLogin": "2023-02-10",
    "ProfilePicURL": "http://example.com/images/userten.jpg",
    "Phone": "012-345-6789",
    "Bio": "World traveler and language learner."
  }
]
