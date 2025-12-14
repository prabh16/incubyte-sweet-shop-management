import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (loggedIn) {
    return <Dashboard />;
  }

  return showRegister ? (
    <Register onSwitchToLogin={() => setShowRegister(false)} />
  ) : (
    <Login
      onSwitchToRegister={() => setShowRegister(true)}
      onLogin={() => setLoggedIn(true)}
    />
  );
}

export default App;
