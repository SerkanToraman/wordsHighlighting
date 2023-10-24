"use client";
import React, { useRef, useState, useEffect } from "react";
import LoginForm from "@/component/LoginForm";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/store/store";

const Page: React.FC = () => {
  const userName = useAppSelector((state) => state.authReducer.value.username);
  const toggle = useAppSelector((state) => state.authReducer.value.isModerator);


  return (
   <main className=""> 
   <LoginForm/>
   <h1>Username:{userName}</h1>
   <h1>{toggle===false? "" :"Moderator"}</h1>
   </main>
  );
};

export default Page;
