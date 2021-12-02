import Router from "components/Router";
import { react, useEffect, useState } from "react";
import {authService} from 'fbase';

function App() {
  console.log()
  const [initialiazed, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user) =>{
    console.log(user)
      if(user){
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])

  return (
    <>
      {initialiazed ? <Router isLoggedIn={isLoggedIn} /> : 'Lodig...'}
      <footer>&copy;  {new Date().getFullYear()} firetwitter</footer>
    </>
  );
}

export default App;
