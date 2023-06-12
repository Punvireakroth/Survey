const express = require("express");
const {
  getUser,
  createUser,
  loginUser,
  updateUserSurveys,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/getUser", getUser);
router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/updateSurveys/:id", updateUserSurveys);
router.delete("/delete/:id", deleteUser);

module.exports = router;
