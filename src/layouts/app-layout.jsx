import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

const AppLayout = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
              <main className="min-h-screen contaner">
                    <Header/>
        <Outlet />
              </main>
              <div className="p-10 text-center bg-gray-800 mt-10">
                    Made by Mohit Khurana
              </div>
    </div>
  );
};

export default AppLayout;
