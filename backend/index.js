import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/auth-demo");

// موديل المستخدم
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// تسجيل مستخدم جديد
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "الإيميل مستخدم من قبل" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
});

// تسجيل الدخول
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "الحساب غير موجود" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "كلمة السر غير صحيحة" });

  res.json({ user: { id: user._id, name: user.name, email: user.email } });
});

// تشغيل السيرفر
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
}); 