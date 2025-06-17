import { logoutUser } from "@/controllers/user.controllers";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  return logoutUser(req); // Tu ne jo function banaya tha usi ko call kar diya
}
