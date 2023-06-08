
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post( '/signup/user', userController.uploadUserPhoto,
  userController.resizeUserPhoto, authController.signupUser );
router.post('/login/user', authController.loginUser);


// Protect all routes after this middleware
// router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe1',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);
router.patch('/updateMe', userController.updateMe);

// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/chatlist/:id')
  .get(userController.getAllChatUser)
router
  .route('/wishlist/add/:id')
  .post(userController.addToWishList)
router
  .route('/wishlist/delete/:id')
  .post(userController.deleteFromWishList)
  router
  .route('/wishlist/:id')
  .get(userController.getWishList)
  router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
