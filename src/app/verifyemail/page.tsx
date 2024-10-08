"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  //   const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const { query } = router;
    // const urlTokenTwo = query.token;
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Verify Email</h1>
        <h2 className="text-xl mb-6 text-gray-600">
          {token ? `${token}` : `No Token`}
        </h2>

        {verified && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold">Verified</h2>
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 underline mt-4"
            >
              Login
            </Link>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}
