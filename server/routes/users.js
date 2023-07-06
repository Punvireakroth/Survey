// const express = require("express");
// const {
//   getUser,
//   createUser,
//   loginUser,
//   updateUserSurveys,
//   deleteUser,
// } = require("../controllers/userController");
// const router = express.Router();

// router.get("/getUser", getUser);
// router.post("/register", createUser);
// router.post("/login", loginUser);
// router.put("/updateSurveys/:id", updateUserSurveys);
// router.delete("/delete/:id", deleteUser);

// module.exports = router;

// ----------------------------------------------------------------------------

const express = require("express");

const { signupUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
