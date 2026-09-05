import { useState } from "react";
import SignIN from "./MainScreens/SignIN";
import Register from "./MainScreens/Register";

function App() {
  const [view, setView] = useState("signin"); // "signin" | "register"

  return view === "signin" ? (
    <SignIN onNavigateToRegister={() => setView("register")} />
  ) : (
    <Register onNavigateToSignIn={() => setView("signin")} />
  );
}

export default App;