import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import clubs from "@/lib/models/clubs";
import { HashPassword } from "@/utils/managePassword";

export async function POST(req) {
  //   const data = await req.json();
  await connect();

  const { name, manager, rating, userName, password, category } =
    await req.json();
  console.log(userName);
  console.log(category);

  try {
    // Check if the userName already exists
    const existingClub = await clubs.findOne({ userName });
    if (existingClub) {
      return NextResponse.json("User name already exists", {
        status: 400,
        success: false,
      });
    }

    const hashedPassword = await HashPassword(password);
    console.log("hashedPassword");

    // Create a new user
    const newclub = new clubs({
      name,
      manager,
      rating,
      userName,
      password: hashedPassword,
      category,
    });
    console.log(hashedPassword);
    console.log(newclub);
    await newclub.save();

    return NextResponse.json("Club registered successfully", {
      status: 201,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json("Internal Server Error", {
      status: 500,
      success: false,
      error: error.message,
    });
  }
}
export async function GET() {
  return NextResponse.json("you get this", {
    status: 200,
    success: true,
  });
}
