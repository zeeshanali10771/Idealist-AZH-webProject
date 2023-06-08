const express = require('express');
const router = express.Router();
router.delete('/user/wishlist/delete/:jobId', (req, res) => {
    const userId = req.user._id; // Assuming you have authentication middleware to retrieve the user ID
    const jobId = req.params.jobId;
  
    // Logic to remove the job from the user's wishlist
    // Replace this with your actual implementation
  
    // Example: Removing the job from a user's wishlist stored in a database
    User.findById(userId, (err, user) => {
      if (err) {
        // Handle the error
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      // Find and remove the job from the wishlist
      const updatedWishlist = user.wishlist.filter((job) => job.id !== jobId);
      user.wishlist = updatedWishlist;
  
      // Save the updated user object
      user.save((err) => {
        if (err) {
          // Handle the error
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        // Return a success response
        res.status(200).json({ message: 'Job removed from wishlist' });
      });
    });
  });
  module.exports = router;
  