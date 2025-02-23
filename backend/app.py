import os
from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
cors = CORS(app, origins="*")

def get_db_connection():
    connection = mysql.connector.connect(
    host=os.getenv('MYSQL_HOST', 'localhost'),
    user=os.getenv('MYSQL_USER', 'root'),
    password=os.getenv('MYSQL_PASSWORD', 'root'),
    database=os.getenv('MYSQL_DB', 'mydatabase'),
    port=3306
)

    return connection

@app.route('/api/users', methods=['GET'])
def users():
    con = get_db_connection()  # Get a fresh connection for each request
    try:
        cursor = con.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users')
        rows = cursor.fetchall()

        if rows:
            return jsonify(rows), 200
        else:
            return jsonify({"message": "No users found."}), 404

    except Error as e:
        print("Error reading data from MySQL table", e)
        return jsonify({"error": str(e)}), 500

    finally:
        if con.is_connected():
            cursor.close()
            con.close()  # Close the connection specifically for this request
            print("MySQL connection is closed")

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080, debug=True)
