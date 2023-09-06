import React from "react";
import Chart from "../assets/Chart.jpeg";

function Home() {
  return (
    <div className="w-full h-[1275px] xl:h-[383px] bg-[#f74949] ">
      <h1 className="text-center text-5xl py-4 xl:w-[600px] xl:text-7xl text-zinc-200 xl:p-4 home-header">
        The Expense Tracker App
      </h1>
      {/* Main div for left and ride content */}
      <div className="w-[100%] h-screen xl:flex">
        {/* Left side div */}
        <div className="w-full h-[400px] flex justify-center  xl:w-[40%] xl:h-[100%]  xl:flex xl:flex-col xl:flex-wrap xl:justify-center items-center xl:translate-y-[-120px]">
          <img
            className="w-[400px] xl:w-[500px] border rounded-xl border-zinc-600 shadow-xl shadow-zinc-800"
            src={Chart}
          />
        </div>
        {/* Right side div - Parent div for content */}
        <div className="m-4 h-screen overflow-y-scroll xl:w-[60%] xl:h-screen  flex flex-wrap xl:flex-wrap justify-center gap-7 xl:grid grid-cols-2 p-9 xl:translate-y-[-190px]">
          {/* Top left card */}
          <div className="w-[450px] xl:w-[350px] h-[300px] border rounded-xl border-zinc-600 shadow-xl shadow-zinc-500 text-center bg-[#fafafa]/90">
            <ul className="text-zinc-600 p-7 text-sm list-disc flex flex-col gap-3">
              <li className="list-none text-center">
                <h3 className="text-2xl font-bold border-b text-[#f95757] border-zinc-500">
                  USER <br /> AUTHENTICATION
                </h3>
              </li>
              <li>
                Supports user registration with username, email, and password
              </li>
              <li>Provides login functionality with username and password</li>
              <li>Generates JSON Web Tokens (JWT) for authenticated users</li>
            </ul>
          </div>
          {/* Top right card */}
          <div className="w-[450px] xl:w-[350px] h-[300px] border rounded-xl border-zinc-600 shadow-xl shadow-zinc-500 text-center bg-[#fafafa]/90">
            <ul className="text-zinc-600 p-7 text-sm list-disc flex flex-col gap-3">
              <li className="list-none text-center">
                <h3 className="text-2xl font-bold border-b text-[#f95757]  border-zinc-500 ">
                  PROTECTED DASHBOARD
                </h3>
              </li>
              <li>Displays user-specific expense data after login</li>
              <li>
                Provides a user-friendly interface for adding, updating, and
                deleting expenses
              </li>
              <li>
                Implements middleware for protecting routes that require
                authentication
              </li>
            </ul>
          </div>
          {/* Bottom left card */}
          <div className="w-[450px] xl:w-[350px] h-[300px] border rounded-xl border-zinc-600 shadow-2xl shadow-zinc-800 text-center bg-[#fafafa]/90">
            <ul className="text-zinc-600 p-7 text-sm list-disc flex flex-col gap-3">
              <li className="list-none text-center">
                <h3 className="text-2xl font-bold border-b text-[#f95757] border-zinc-500">
                  USER-FRIENDLY INTERFACE
                </h3>
              </li>
              <li>Utilizes React for building the frontend interface</li>
              <li>Implements navigation through a top navbar</li>
              <li>Displays charts to visualize expense data</li>
            </ul>
          </div>
          {/* Bottom right card */}
          <div className="w-[450px] xl:w-[350px] h-[300px] border rounded-xl border-zinc-600 shadow-2xl shadow-zinc-800 text-center bg-[#fafafa]/90">
            <ul className="text-zinc-600 p-7 text-sm list-disc flex flex-col gap-3">
              <li className="list-none text-center">
                <h3 className="text-2xl font-bold border-b text-[#f95757]  border-zinc-500">
                  CHARTS AND DATA VISUALIZATION
                </h3>
              </li>
              <li>
                Uses charts to provide insights into users' spending habits
              </li>
              <li>
                Enables users to identify trends and make informed financial
                decisions
              </li>
              <li>
                Visualizes actual spending against budget limits to help users
                manage finances effectively
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
