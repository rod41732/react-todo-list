import React, { useContext } from 'react'
import { TodoContext } from "../contexts/todoApp";
import './login.css'
const LoginForm = () => {
  
  
  return <div className="w-full h-full login-form bg-red-100">
    <div className="bg-gray-100 p-8 shadow">
      <div className="text-xl p-2 text-center font-bold"> Login </div>
      <div className="flex-auto mx-2">
        <div className="mt-4 text-sm font-bold text-gray-500"> Username </div>
        <input className="p-2 border-gray-500 w-full"/>
      </div>
      <div className="flex mt-4">
        <div className="flex-auto mx-2">
          <div className="text-sm font-bold text-gray-500"> Bar </div>
          <input className="p-2"/>
        </div>
        <div className="flex-auto mx-2">
          <div className="text-sm font-bold text-gray-500"> Bar </div>
          <input className="p-2"/>
        </div>
      </div>
      <div className="buttons w-full flex flex-row">
        <button className="flex-1 p-4"> A</button>
        <button className="flex-1 p-4"> B</button>
      </div>

    </div>
  </div>
}

export default LoginForm;