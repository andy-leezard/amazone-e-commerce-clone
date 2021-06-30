import React, { useState } from 'react';
import router from 'next/router'
import { db, auth } from '../../firebase';

function signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redoInfo, setRedoInfo] = useState(false);
    const [msg_error, setmsg_error] = useState('Incorrect information');

    const [accCreated, setAccCreated] = useState(false);
    const [plsCreateFirst, setPlsCreateFirst] = useState(false);

    function isValidEmailAddress(address) {
      return !! address.match(/.+@.+/);
    }

    const firebaseRegister = e => {
        e.preventDefault();
        setPlsCreateFirst(false);
        if(accCreated){
          return;
        }
        if(username.length <1){
          setRedoInfo(true);setmsg_error("Username is too short");return;
        }else if(username.length > 16){
          setRedoInfo(true);setmsg_error("Username is too long");return;
        }
        if(email.length <8){
          setRedoInfo(true);setmsg_error("Incorrect email format - too short");return;
        }else if(email.length > 32){
          setRedoInfo(true);setmsg_error("Incorrect email format - too long");return;
        }else if(isValidEmailAddress(email) === false){
          setRedoInfo(true);setmsg_error("Incorrect email format");return;
        }
        if(password.length <6){
          setRedoInfo(true);setmsg_error("Password is too simple");return;
        }else if(password.length >48){
          setRedoInfo(true);setmsg_error("Password is too long");return;
        }
        var loweremail = email.toLowerCase();

        auth
            .createUserWithEmailAndPassword(loweremail,password)
            .then(() => {
                //it successfully created a new user with email and password.
                db
                .collection('users')
                .doc(loweremail)
                .set({
                    username: username,
                })
                setAccCreated(true);
                setRedoInfo(false);
            })
            .catch(error => errorMsg(error.message))
    }

    const errorMsg = (e) => {
      setmsg_error(e);
      setRedoInfo(true);
    }

    const firebaseSignin = e => {
      e.preventDefault();
      if(!accCreated){
        setPlsCreateFirst(true);return;
      }
      auth
          .signInWithEmailAndPassword(email, password)
          .then((auth) => {
            if (auth) {
              router.push('/welcome')
            }
          })
          .catch(error => alert(error.message))
    }

    return (
        <div className="text-center">
        <img onClick={() => router.push('/')} className="link mt-4 mx-auto w-6/12 sm:w-4/12 md:w-2/12 lg:w-1/12" src="/logo_side6_dark.svg" alt="" />
        <div className="mx-auto flex flex-col text-left w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 border rounded-md border-solid border-gray-300 p-5 w-300">
            <h1 className="text-left text-2xl font-semibold px-1 mb-2">
              Sign-Up Form
            </h1>
            {redoInfo && ( <div className="border-2 border-solid border-red-200 bg-red-400 rounded-md p-1"><p className="text-white font-semibold text-xs">  {msg_error}</p></div> )}
            {plsCreateFirst && ( <div className="border-2 border-solid border-red-200 bg-red-400 rounded-md p-1"><p className="text-white font-semibold text-xs">  Please register your account first.</p></div> )}
            {accCreated && ( <div className="border-2 border-solid border-green-200 bg-green-400 rounded-md p-1"><p className="text-white font-semibold text-xs">  Account created ! Proceed to Sign in.</p></div> )}
                <form>
                  <label className="text-sm font-semibold mt-2 px-1">
                    Username
                  <input type='text' className="w-full border border-solid border-gray-400 rounded-md px-1" disabled={accCreated} value={username} onChange={e => setUsername(e.target.value)} placeholder="Wojak Dubled" />
                  </label>
                  <label className="text-sm font-semibold mt-2 px-1">
                    Email address
                  <input type='text' className="w-full border border-solid border-gray-400 rounded-md px-1" disabled={accCreated} value={email} onChange={e => setEmail(e.target.value)} placeholder="test@test.test" />
                  </label>
                  <label className="text-sm font-semibold mt-2 px-1">
                    Password
                    <input type='password' className="w-full border border-solid border-gray-400 rounded-md px-1" disabled={accCreated} value={password} onChange={e => setPassword(e.target.value)} />
                  </label>
                  {accCreated ? (<button onClick={firebaseSignin} className="mt-3 button w-full rounded-md font-bold" type='submit' >Sign in</button>) : (<button onClick={firebaseRegister} className="mt-3 button w-full rounded-md font-semibold" type='submit' >Register</button>)}
                  
                </form>
                <p className="font-semibold text-center mt-4 text-sm text-gray-600">
                    Reminder: it is not necessary to provide real information.
                    By signing-in, you agree to the "ÀMAZONE.LEE" <a href="/conditions">Conditions of Use</a>.
                </p>
        </div>
        <div className="mx-auto mt-2">
          <h2 className="mx-auto w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 border-t border-solid border-gray-300 mt-2.5 mb-2.5" ><span className="absoulte text-gray-600 text-sm bg-white pb-2.5">Do you remember your Amazone account?</span></h2>
        </div>
        <div className="mx-auto w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 p-1">
          <button onClick={() => router.push('/auth/signin')} className="p-2 w-11/12 text-xs md:text-sm bg-gradient-to-b from-gray-200 to-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 active:from-gray-500 font-semibold">I think I do</button>
        </div>
        <div className="flex space-x-4 justify-center mx-auto mt-2 mb-4">
              <a href="/conditions"><p className="font-semibold text-indigo-700 text-sm">Conditions of Use</p></a>
              <a href="https://www.linkedin.com/in/andy-lee-4b913719a" target="_blank" rel="noopener noreferrer"><p className="font-semibold text-green-600 text-sm">Contact & Feedback</p></a>
        </div>
        <p className="font-semibold text-gray-600 text-sm my-4">© 2021 | Developed by Andy Lee</p>
    </div>
    )
}

export default signup
