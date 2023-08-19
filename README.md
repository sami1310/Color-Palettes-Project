The project allows users to explore color palettes created by others and craft their own unique combinations. It utilizes Django as the backend framework and SQLite as the database system.

Features:

Public Access: Users can view a selection of public color palettes without the need for an account.
Advanced Search: Easily find palettes using palette names or specific colors.
User Authentication: Secure login system for a personalized experience.
Personalized Creation: Once logged in, users can design and publish their own palettes. Public palettes are then showcased on the dashboard. 

Prerequisites: 
Python (version, e.g., 3.8 or higher)
Pip (Python package installer)
Virtualenv (optional, but recommended)

Setting Up the Project
Clone the Repository

Use Git to clone the project repository:
git clone https://github.com/sami1310/Color-Palettes-Project.git
cd color_palette

Set Up a Virtual Environment (Optional, but Recommended)
If you have virtualenv installed:
virtualenv venv

To activate the virtual environment:

On macOS/Linux:
source venv/bin/activate

On Windows:
venv\Scripts\activate

Install Dependencies:
Once inside the project directory and with your virtual environment activated, install the project dependencies:
pip install -r requirements.txt

Running the Project

Database Migrations (if you're using a database)

Make sure to apply migrations before starting the server:
python manage.py migrate

Start the Development Server

To start the development server:
python manage.py runserver

The server will typically start on http://127.0.0.1:8000/. Visit this URL in your browser.
