import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-5 text-center w-full">
            <div className="flex flex-wrap w-full p-5 justify-between gap-4">
                <p><Link to="/budget">Get Started</Link></p>
                <p>Personal Budget Manager</p>
                <p className="text-sm pb-5">© {new Date().getFullYear()} personal budget manager. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;