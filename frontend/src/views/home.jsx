import Navbar from './HomeComponents/navbar.jsx';
import Passwords from './HomeComponents/passwords.jsx';


export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <Navbar />
        <Passwords />

        


        <h1 className="text-4xl font-bold">Home</h1>
        </div>
    );
}
