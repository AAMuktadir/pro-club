import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import players from "@/lib/models/players";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function POST(request) {
  await connect();

  const { name, position, email, contact, age, height, foot } =
    await request.json();

  try {
    const clubID = await getDataFromToken(request).id;
    const clubName = await getDataFromToken(request).name;

    // hello, here starts
    const existingPlayer = await players.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingPlayer) {
      if (existingPlayer.email === email) {
        return NextResponse.json(
          {
            message: "Email already exists",
            success: false,
          },
          { status: 409 }
        );
      }

      if (existingPlayer.contact === contact) {
        return NextResponse.json(
          {
            message: "Contact already exists",
            success: false,
          },
          { status: 422 }
        );
      }
    }

    //helloo here ends
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
    console.log(error);
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
