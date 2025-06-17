import { Schema, model, models, Document } from "mongoose";

// 1. Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
  refreshToken?: string;
  createdAt: Date;
}

// 2. Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "ConfirmPassword is required"],
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 3. Model
const User = models.User || model<IUser>("User", userSchema);
export default User;
