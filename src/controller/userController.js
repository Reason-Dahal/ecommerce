import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(username);
    if (!username || !email || !password) {
      return res.status(404).send({ message: "Please enter all the fields." });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await user.save();
    return res
      .status(201)
      .send({ message: "User created Successfully.", user: user });
  } catch (error) {
    res.status(500).send({ message: error });
    console.error("error", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ message: "Please enter all the fields." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "User does not exist." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res
      .status(200)
      .send({ message: "Login successful.", user: user, token });
  } catch (error) {
    res.status(500).send({ message: error });
    console.error("error", error);
  }
};
