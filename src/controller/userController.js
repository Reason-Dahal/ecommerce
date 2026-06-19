import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ message: "Please enter all the fields" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).send({ message: "Email already exist" });
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
      .send({ message: "Account created successfully", user: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Something went wrong. Please try again later." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Please enter all the fields" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User doesn't exist" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    const token = jsonwebtoken.sign(
      {
        id: user._id,
        email: email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    return res
      .status(200)
      .send({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Server error. Please try again later." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username } = req.body;

    if (!username) {
      return res.status(400).send({
        message: "Username is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    user.username = username;

    await user.save();

    return res.status(200).send({
      message: "Username updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Server error",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).send({
        message: "Please provide current and new password",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(currentPassword, user.password);

    if (!isMatched) {
      return res.status(400).send({
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).send({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Server error",
    });
  }
};