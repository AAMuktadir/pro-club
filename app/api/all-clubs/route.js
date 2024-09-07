import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import clubs from "@/lib/models/clubs";

export async function GET() {
  try {
    await connect();

    const club = await clubs.find();
    return NextResponse.json(
      { message: "Clubs found", data: club },
      {
        status: 200,
        success: true,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
