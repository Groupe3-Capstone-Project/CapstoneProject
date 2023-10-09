import { useState } from 'react';
import MainContainer from './components/MainContainer';
// import NavBar from './components/NavBar';

function App() {
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));

  return (
    <div>
       {/* < NavBar /> */}
       <MainContainer userId={userId} setUserId={setUserId}/>
    </div>
  );
}

export default App;
