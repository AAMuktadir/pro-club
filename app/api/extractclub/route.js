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

export async function PATCH(request) {
  await connect();

  const { name, manager, category } = await request.json();

  try {
    const clubID = await getDataFromToken(request);
    const existingClub = await clubs.findById(clubID);
    if (!existingClub) {
      return NextResponse.json("Club not found", {
        status: 404,
        success: false,
      });
    }

    // Update club fields if provided
    if (name) existingClub.name = name;
    if (manager) existingClub.manager = manager;
    if (category) existingClub.category = category;

    // Save the updated user
    await existingClub.save();

    return NextResponse.json("Club updated successfully", {
      status: 200,
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
