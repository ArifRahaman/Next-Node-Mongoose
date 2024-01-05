"use client";
// import { response } from "express";
// import Image from "next/image";
import {useState} from 'react';
export default function Home() {
  const [form, setForm] = useState({})
  const handleForm = (e) => {
    // console.log(e.target.value,e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:8080/demo", {
      // method:"GET"
      // Specify the HTTP method as POST
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data=await response.json();
    console.log(data);
  }
  return (
    <div>
      <form className="px-6 py-5" onSubmit={handleSubmit}>
        {/* <p> {JSON.stringify(form)}</p> */}
        <span>username: </span>
        <input
          type="text"
          placeholder="username" name='username'
          className="h-10 text-center"
          onChange={handleForm}
        ></input>
        <span>password: </span>
        <input
          type="text" name='password'
          placeholder="password"
          className="h-10 text-center"
          onChange={handleForm}
        ></input>
        <input
          type="submit"
          class="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded cursor-pointer"
        ></input>
      </form>
    </div>
  );
}
