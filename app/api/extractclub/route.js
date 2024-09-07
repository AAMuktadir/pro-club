import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import clubs from "@/lib/models/clubs";

export async function GET(request) {
  try {
    await connect();
    const clubID = await getDataFromToken(request);
    const club = await clubs.findById({ _id: clubID }).select("-password");
    return NextResponse.json(
      { message: "Club found", data: club },
      {
        status: 200,
        success: true,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
