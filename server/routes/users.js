const express = require("express");
const {
  getUser,
  loginOrCreateUser,
  updateUserSurveys,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/getUser", getUser);
router.post("/login", loginOrCreateUser);
router.put("/updateSurveys/:id", updateUserSurveys);
router.delete("/delete/:id", deleteUser);

module.exports = router;
