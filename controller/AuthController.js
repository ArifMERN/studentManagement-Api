// dependencies..
const Employee = require("../model/Employees");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;
const bcrypt = require("bcrypt");

// signup controller
const signup = async (req, res) => {
  // check all fields are filled
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(403).json({ message: "all fields are required" });
  }
  try {
    const employee = await Employee.findOne({ email });
    // check user already exists
    if (employee) {
      return res.status(400).json({ message: "user already exists" });
    }
    // create hash of password..
    const hashPwd = await bcrypt.hash(password, 10);
    // create user
    const saveEmp = new Employee({
      email,
      name,
      password: hashPwd,
    });
    const emp = await saveEmp.save();
    if (emp) {
      res.status(200).json({ messgae: `signup completed successfully ` });
    } else {
      res.status(403).json({ message: "Invalid user details recieved" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
// signIn controller
const signin = async (req, res) => {
  // check all fields are filled
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ message: "please fill all the details" });
  }
  // check username and password
  const employee = await Employee.findOne({ email });
  if (!employee) {
    return res
      .status(403)
      .json({ message: "email or password not matching...!" });
  }
  // decrypting the password
  const deHashPwd = await bcrypt.compare(password, employee.password);
  if (employee.email === email && deHashPwd) {
    jwt.sign({ employee }, secretKey, { expiresIn: "3h" }, (err, token) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({
          Token: token,
          name: employee.name,
        });
      }
    });
  } else {
    return res
      .status(403)
      .json({ message: "email or password not matching...!" });
  }
};

module.exports = { signin, signup };
