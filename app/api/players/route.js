import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import players from "@/lib/models/players";

export async function POST(request) {
  await connect();

  const {
    name,
    position,
    email,
    contact,
    age,
    height,
    foot,
    clubID,
    clubName,
  } = await request.json();

  try {
    console.log("foot");
    console.log(foot);

    const newPlayer = new players({
      name,
      position,
      email,
      contact,
      age,
      height,
      foot,
      clubID,
      clubName,
    });
    await newPlayer.save();

    return NextResponse.json("Player added successfully", {
      status: 201,
      success: true,
    });
  } catch (error) {
    return NextResponse.json("Internal Server Error", {
      status: 500,
      success: false,
      error: error.message,
    });
  }
}

export async function GET() {
  try {
    await connect();
    const player = await players.find();
    return NextResponse.json(
      { message: "Newsfeed found", data: player },
      {
        status: 200,
        success: true,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await connect();
    const { playerId } = await request.json();
    await players.findOneAndDelete({ _id: playerId });
    return NextResponse.json(
      { message: "Player deleted" },
      {
        status: 200,
        success: true,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
