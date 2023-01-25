const router = require("express").Router();
const Auth = require("../middleware/AuthMiddleware");
const studentController = require("../controller/StudentController");
// create a new student
router.post("/create", Auth, studentController.createStudent);

// get all students
router.get("/all", Auth, studentController.getAllStudents);
router.get("/report", Auth, studentController.getReport);
router.post("/results", Auth, studentController.setResults);

module.exports = router;
