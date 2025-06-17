// app/api/auth/login/route.ts

import { loginUser } from "@/controllers/user.controllers"; // jahan tu loginUser likha hai
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return loginUser(req); // Tu ne jo function banaya tha usi ko call kar diya
}
