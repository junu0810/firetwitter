import Router from "components/Router";
import { react, useState } from "react";
import {authService} from 'fbase';

function App() {
  console.log()
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>&copy;  {new Date().getFullYear()} firetwitter</footer>
    </>
  );
}

export default App;
