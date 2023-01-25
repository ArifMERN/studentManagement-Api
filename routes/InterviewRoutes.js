const router = require("express").Router();
const Auth = require("../middleware/AuthMiddleware");
const interviewController = require("../controller/InterviewController");
// create a interview
router.post("/create", Auth, interviewController.createInterview);
// add a student to interview
router.post("/add_student", Auth, interviewController.addStuentInterview);
//get all interviews
router.get("/all", Auth, interviewController.getAllInterviews);

router.get("/:id", Auth, interviewController.getInterview);

module.exports = router;
