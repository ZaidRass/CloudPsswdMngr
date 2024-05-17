import Navbar from "./components/NavBar.jsx";
import Passwords from "./components/passwords.jsx";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Navbar />
      <Passwords />
    </div>
  );
}
