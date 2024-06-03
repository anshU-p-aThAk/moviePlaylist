const express = require('express');
const router = express.Router();
const Movie = require('../model/movie');
const User = require('../model/user');


router.post('/addtolib', async (req, res) => {
  const { userId, title, poster, year, type } = req.body;
  console.log('Received request to add movie to library:', req.body); 

  try {

    let movie = await Movie.findOne({ title, year, type });

    if (!movie) {
      movie = new Movie({ title, poster, year, type });
      await movie.save();
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (!user.movies.includes(movie._id)) {
      user.movies.push(movie._id);
      await user.save();
    }

    console.log('Movie added to user library:', movie);
    res.status(200).json({ message: 'Movie added to library', movieId: movie._id });
  } catch (error) {
    console.error('Error adding movie to library:', error);
    res.status(500).json({ message: 'Error adding movie to library', error });
  }
});

module.exports = router;
