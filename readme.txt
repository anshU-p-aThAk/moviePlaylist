#Movie Store

My Movie Store is a web application that allows users to create and manage their personal movie libraries. Users can search for movies, add them to their library, and manage their privacy settings.

Features
Search: Users can search for movies using the search bar. The application fetches data from the OMDB API to display search results.

Add to Library: Users can add movies from the search results to their personal library by clicking the "Add to Library" button.

Privacy Settings: Users can toggle the privacy setting for their library. When the library is set to private, only the user can view their list of movies.

Delete from Library: Users can remove movies from their library by clicking the "Delete" button next to each movie.

Technologies Used
Frontend: EJS, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Authentication: Passport.js

#Setup

1.clone the repository: 

git clone <repository-rul>

2.Install dependencies:

npm install

3.Set up environment variables:

Create a '.env' file in root directory

Add PORT = <Your port>
Add MONGODB_URI = 'your mongourl'

4.Run the application.

node app.js