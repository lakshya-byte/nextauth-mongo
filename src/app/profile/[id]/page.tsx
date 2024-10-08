"use client";
import React from "react";

export default function page({params}:any) {
  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Profile Page</h1>
      <h2 className="text-xl text-gray-600">{params.id}</h2>
    </div>
  </div>
  
  )
}
