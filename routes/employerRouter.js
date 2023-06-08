const express = require("express");
const {
  getAllEmployer,
  getSingleEmployer,
  createEmployer,
  updateEmployer,
  deleteEmployer,
  getMe,
  deleteMe,
  uploadUserPhoto,
  resizeUserPhoto,
  updateMe,
  getAllChatUser
} = require("../controllers/employerController");
const authController = require("./../controllers/authController");

const employerRouter = express.Router();

//Optimize:   ***** Routes ******
employerRouter.post( "/signup/employer", uploadUserPhoto, resizeUserPhoto, authController.signupEmployer );
employerRouter.post("/login/employer", authController.loginEmployer);

// Protect all routes after this middleware
employerRouter.use(authController.protect);

employerRouter.get("/me", getMe, getSingleEmployer);
employerRouter.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
employerRouter.delete("/deleteMe", deleteMe);

employerRouter.route("/").get(getAllEmployer).post(createEmployer);

employerRouter.route('/chatlist/:id')
    .get(getAllChatUser)
  employerRouter
  .route("/:id")
  .get(getSingleEmployer)
  .delete(deleteEmployer)
  .patch(updateEmployer);

module.exports = employerRouter;
