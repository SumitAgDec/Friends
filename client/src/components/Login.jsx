import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/friends/login", { email, password })
      .then((res) => {
        console.log(res);
        setEmail("");
        setPassword("");

        navigate("/");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen bg-slate-300">
      <h1 className="text-lg font-semibold">Login</h1>
      <div className="w-full max-w-xs ">
        <form
          onSubmit={handleForm}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <h1 className="text-red-500 text-center font-semibold mb-3">{error}</h1>
        <p className="text-center text-gray-500 text-xs">
          &copy;2025 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
