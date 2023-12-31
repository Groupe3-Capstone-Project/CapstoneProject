import { useState } from "react";
import MainContainer from "./components/MainContainer";
// import NavBar from './components/NavBar';

function App() {
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("isAdmin")
  );
  const [currentUser, setCurrenUser] = useState('')

  return (
    <div>
      {/* < NavBar /> */}
      <MainContainer
        userId={userId}
        setUserId={setUserId}
        token={token}
        setToken={setToken}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        currentUser={currentUser}
        setCurrentUser={setCurrenUser}
      />
    </div>
  );
}

export default App;
