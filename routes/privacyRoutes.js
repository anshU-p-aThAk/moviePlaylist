const express = require('express');
const router = express.Router();
const { User } = require('../model/user');


router.post('/updatePrivacy', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isPrivate = req.body.isPrivate;
        await user.save();
        res.status(200).json({ message: 'Privacy updated successfully' });
    } catch (error) {
        console.error('Error updating privacy:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/deleteFromLib', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.movies = user.movies.filter(movie => movie.toString() !== req.body.movieId);
        await user.save();
        res.status(200).json({ message: 'Movie deleted from library' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//   router.post('/hue',(req,res)=>{
//     res.redirect('/home');
//   })


router.get('/getPrivacy', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await User.findById(req.user._id).select('isPrivate');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ isPrivate: user.isPrivate });
    } catch (error) {
        console.error('Error fetching privacy setting:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
