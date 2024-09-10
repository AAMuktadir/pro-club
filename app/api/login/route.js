"use server";
import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import clubs from "@/lib/models/clubs";
import { ComparePasswords } from "@/utils/managePassword";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  await connect();

  const { userName, password } = await req.json();

  try {
    const club = await clubs.findOne({ userName });
    if (!club) {
      throw new Error("Club not found");
    }

    const isPasswordValid = await ComparePasswords(password, club.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    //create token data
    const tokenData = {
      id: club._id,
      userName: club.userName,
      name: club.name,
    };

    //create token
    const token = jwt.sign(tokenData, process.env.Token_Secret, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({ message: "Login successful" }, club, {
      status: 200,
      success: true,
    });

    cookies().set("token", token, {});

    return response;
  } catch (error) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { message: "something went wrong", error: error.message },
      {
        status: 401,
        success: false,
      }
    );
  }
}
