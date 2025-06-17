import cloudinary from "@/lib/Cloudinary";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export const registerUser = async (req: NextRequest) => {
  await dbConnect();

  try {
    // Parse multipart form data
    const formData = await req.formData();

    // Extract non-file fields as JSON strings
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Extract file (avatar)
    const avatarFile = formData.get("avatar") as File | null;

    // ✅ Validate fields
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let avatarUrl = "";

    if (avatarFile && avatarFile.size > 0) {
      const buffer = await avatarFile.arrayBuffer();
      const base64String = Buffer.from(buffer).toString("base64");

      const uploadRes = await cloudinary.uploader.upload(
        `data:${avatarFile.type};base64,${base64String}`,
        {
          folder: "avatars",
          resource_type: "auto",
        }
      );
      avatarUrl = uploadRes.secure_url;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
