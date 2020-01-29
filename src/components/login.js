import React, { useContext, useRef, useState } from 'react'
import { TodoContext } from "../contexts/todoApp";
import './login.css'
import request from 'superagent';
import { apiRoot } from '../actions/config';
const LoginForm = () => {
  
  const userRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const {methods: {login}} = useContext(TodoContext);
  const [isRegistering, setRegistering] = useState(false);

  const register = () => {
    console.log('username', userRef.current.value, 'apassword', passwordRef.current.value)
    const username = userRef.current.value;
    const password = passwordRef.current.value;
    request.agent().post(`${apiRoot}/user/register`)
      .send({username, password, email: 'rod8711@gmail.com'})
      .then((res) => {
        alert("Register success")
      })
      .catch((err) => {
        alert(err.response.text);
      })
  }

  const onLogin = () => {
    const username = userRef.current.value;
    const password = passwordRef.current.value;
    login(username, password);
  }

  
  return <div className="w-full h-full login-form bg-red-100">
    <div className="bg-gray-100 p-8 shadow">
      <div className="text-xl p-2 text-center font-bold"> Login </div>
      <div className="flex-auto mx-2">
        <div className="mt-4 text-sm font-bold text-gray-500"> Username </div>
        <input ref={userRef} className="p-2 border-gray-500 w-full" />
      </div>
      <div className="flex mt-4">
        <div className="flex-auto mx-2">
          <div className="text-sm font-bold text-gray-500"> Password </div>
          <input type="password" ref={passwordRef} className="p-2"/>
        </div>
      </div>
      {
        isRegistering && 
        <div className="flex mt-4">
          <div className="flex-auto mx-2">
            <div className="text-sm font-bold text-gray-500"> Email </div>
            <input ref={emailRef} className="p-2"/>
          </div>
        </div>
      }
      <div className="buttons w-full flex flex-col">
        {
          !isRegistering && <>
            <button className="flex-1 p-4" onClick={onLogin}> LOGIN </button>
            <div className="flex-1 text-center text-red-400" onClick={()=> setRegistering(!isRegistering)}> no account ? register now </div>
          </>
        }
        {
          isRegistering && 
          <>
            <button className="flex-1 p-4" onClick={register}> REGISTER </button>
            <div className="flex-1 text-center text-red-400" onClick={()=> setRegistering(!isRegistering)}> already has an account ? login </div>
          </>
        }
      </div>

    </div>
  </div>
}

export default LoginForm;