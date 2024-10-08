"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data._id);
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Profile Page</h1>
        <hr className="mb-4 border-gray-300" />

        <h2 className="text-lg mb-6 text-gray-600">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link
              href={`/profile/${data}`}
              className="text-blue-500 hover:text-blue-700 underline transition-colors duration-300"
            >
              {data}
            </Link>
          )}
        </h2>

        <hr className="mb-4 border-gray-300" />

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Logout
        </button><br />
        <button
          onClick={getUserDetails}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 m-2 rounded-lg transition-colors duration-300"
        >
          Get uer details
        </button>
      </div>
    </div>
  ); 
}
