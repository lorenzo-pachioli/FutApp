import React, { useState, useEffect} from 'react';
import { Navigate} from "react-router-dom";
import InputSyntax from './InputSyntax/InputSyntax';
import { nameValidate, passwordValidate } from './InputSyntax/regExFunctions';
import '../Log in/LoginBtn.css';

export default function SignIn({socket}) {

  const [redirectLogIn, setRedirectLogIn] = useState(false);
  const [nameDisplay, setNameDisplay] = useState('none');
  const [lastNameDisplay, setlastNameDisplay] = useState('none');
  const [passwordDisplay, setPasswordDisplay] = useState('none');
  const [nameBoder, setNameBoder] = useState(true);
  const [lastNameBorder, setLastNameBorder] = useState(true);
  const [passwordBorder, setPasswordBorder] = useState(true);
  const [form, setForm] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password: ''
  })

  const handleSignIn = ()=>{
    try{
      if(form.email){
        socket.emit("sign_up", form)
      }
    }catch(err){
      console.log(`Error signing up, error: ${err}`)
    }
  }

  useEffect(() => {
    const redirect = async ()=>{
      await socket.on("sign_up_res", data =>{
        if(!data.status){
          return console.log(`${data.msg}: ${data.error}`)
        }
        setRedirectLogIn(true)
      })
    }
    redirect();
    setTimeout(() => {
      setRedirectLogIn(false)
    });
  }, [socket]);

  const handleName = (e) => {
    setForm({...form, firstName:`${e.target.value}`});
    setNameBoder(nameValidate(e.target.value));
  }

  const handleLastName = (e) => {
    setForm({...form, lastName:`${e.target.value}`}) 
    setLastNameBorder(nameValidate(e.target.value));
  }

  const handlePassword = (e) => {
    setForm({...form, password:e.target.value.toString()});
    setPasswordBorder(passwordValidate(e.target.value));
  }


  return (
    <div className="LoginBtn" value={form} >
        <div className='form-item'>
          <label>Name</label>
          <div style={{background: nameBoder ? ('linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)'):('rgba(255, 30, 0, 0.664)')}}>
            <input 
            type='text' 
            name="Name" 
            value={form.name} 
            onFocus={() => setNameDisplay('flex')} 
            onBlur={() => setNameDisplay('none')} 
            onChange={(e)=> handleName(e)} />
            <InputSyntax inputName='name' style={{display: `${nameDisplay}`}}/>
          </div>
        </div>
        <div className='form-item'>
          <label>Last name</label>
          <div style={{background: lastNameBorder ? ('linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)'):('rgba(255, 30, 0, 0.664)')}}>
            <input 
            type='text' 
            name="lastName" 
            value={form.lastName} 
            onFocus={() => setlastNameDisplay('flex')} 
            onBlur={() => setlastNameDisplay('none')} 
            onChange={(e)=> handleLastName(e)}/>
            <InputSyntax inputName='lastName' style={{display: `${lastNameDisplay}`}}/>
          </div>
        </div>
        <div className='form-item'>
          <label>Email</label>
          <div>
            <input 
            type='email' 
            name="email" 
            value={form.email} 
            onChange={(e)=>setForm({...form, email:`${e.target.value}`})} />
          </div>
        </div>
        <div className='form-item'>
          <label>Password</label>
          <div style={{background: passwordBorder ? ('linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)'):('rgba(255, 30, 0, 0.664)')}}>
            <input 
            type='password' 
            name='password' 
            value={form.password} 
            onFocus={() => setPasswordDisplay('flex')} 
            onBlur={() => setPasswordDisplay('none')} 
            onChange={(e)=> handlePassword(e)} />
            <InputSyntax inputName='password' style={{display: `${passwordDisplay}`}}/>
          </div>
        </div>
          <button type='submit' className='submit' onClick={handleSignIn}>Sign in</button>
          {redirectLogIn ? (<Navigate to='/login' replace={true} />):('')}
          <div>
          </div>
        </div>
  );
}