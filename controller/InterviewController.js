const Interview = require("../model/Interview");
const Student = require("../model/Student");
//  create a interview
const createInterview = async (req, res) => {
  const { name, date } = req.body;
  if (!name || !date) {
    return res.status(400).json("all fields are required");
  }
  try {
    const createInterview = new Interview({
      name,
      interviewDate: date,
    }).save();
    if (createInterview) {
      res.status(200).json("interview created");
    } else {
      res.status(400).json("something is wrong");
    }
  } catch (error) {
    console.log(error.message);
  }
};
// add student to interview
const addStuentInterview = async (req, res) => {
  const { interviewId, studentId } = req.body;
  if (!interviewId || !studentId) {
    return res.json("all fields are required");
  }
  try {
    // add student to interview
    const checkInterview = await Interview.findById(interviewId);
    const checkStudent = await Student.findById(studentId);

    // checking if already applied
    for (var i = 0; i < checkInterview.applied.length; i++) {
      if (
        JSON.stringify(checkInterview.applied[i]._id) ==
        JSON.stringify(checkStudent._id)
      ) {
        return res.json({ message: "user already applied" });
      }
    }

    checkInterview.applied.push(studentId);
    await checkInterview.save();
    checkStudent.interviews.push({
      id: interviewId,
      company: checkInterview.name,
      date: checkInterview.interviewDate,
      result: "",
    });
    await checkStudent.save();

    res.status(200).json({ message: "applied successfully" });
  } catch (error) {
    res.status(400).json({ message: "something wrong!" });
  }
};
// get all students applied for a interview
const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (error) {
    console.log(error.message);
  }
};
// get the particular interview
const getInterview = async (req, res) => {
  const id = req.params.id;
  try {
    const interviews = await Interview.findById(id).populate("applied");

    res.status(200).json(interviews);
  } catch (error) {
    console.log(eror.message);
  }
};

module.exports = {
  createInterview,
  getAllInterviews,
  addStuentInterview,
  getInterview,
};
