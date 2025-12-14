import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [showRegister, setShowRegister] = useState(false);

  if (loggedIn) {
    return <Dashboard />;
  }

  return (
    <div>
      {showRegister ? (
        <>
          <Register onRegister={() => setShowRegister(false)} />
          <button onClick={() => setShowRegister(false)}>
            Go to Login
          </button>
        </>
      ) : (
        <>
          <Login onLogin={() => setLoggedIn(true)} />
          <button onClick={() => setShowRegister(true)}>
            Go to Register
          </button>
        </>
      )}
    </div>
  );
}

export default App;
