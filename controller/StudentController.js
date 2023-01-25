const Student = require("../model/Student");
const Interview = require("../model/Interview");

// create a student
const createStudent = async (req, res) => {
  const { name, college, batch, dsaScore, webdScore, reactScore } = req.body;
  if (!name || !college || !batch || !dsaScore || !webdScore || !reactScore) {
    return res.status(400).json("all fileds are required");
  }
  try {
    const student = new Student({
      name,
      college,
      dsaScore,
      webdScore,
      batch,
      reactScore,
    });
    const response = await student.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: "something wrong!" });
  }
};

// get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.log(error.message);
  }
};

// set Results for user....
const setResults = async (req, res) => {
  const { id, val, Iid } = req.body;
  try {
    const student = await Student.findById(id);

    for (let i = 0; i < student.interviews.length; i++) {
      if (student.interviews[i].id == Iid) {
        student.interviews[i].result = val;
      }
    }
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: "something wrong!" });
  }
};
// generate report
const getReport = async (req, res) => {
  try {
    const result = await Student.find();
    var modifyResult = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].interviews.length === 0) modifyResult.push(result[i]);
      for (let j = 0; j < result[i].interviews.length; j++) {
        var temp = JSON.parse(JSON.stringify(result[i]));
        delete temp.interviews;

        temp.company = result[i].interviews[j].company;
        temp.Result = result[i].interviews[j].result;
        modifyResult.push(temp);
      }
    }
    res.status(200).json(modifyResult);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getAllStudents, createStudent, setResults, getReport };
