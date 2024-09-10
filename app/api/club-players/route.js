import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import players from "@/lib/models/players";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function POST(request) {
  try {
    await connect();
    const { clubID } = await request.json();
    const clubPlayers = await players.find({ clubID });
    return NextResponse.json(
      { message: "Players found", data: clubPlayers },
      {
        status: 200,
        success: true,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request) {
  try {
    await connect();
    const clubID = await getDataFromToken(request).id;
    const clubPlayers = await players.find({ clubID });
    return NextResponse.json(
      { message: "Players found", data: clubPlayers },
      {
        status: 200,
        success: true,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
