"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";

export default function Page() {
  const [clubData, setClubData] = useState(null);

  const getClubInfo = async () => {
    try {
      const response = await fetch(`${Domain}/api/extractclub`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setClubData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
      getClubInfo();
    }
  }, []);

  return (
    <div>
      <Header name={"Profile"} />
      <div className="py-16">club profile</div>
    </div>
  );
}
