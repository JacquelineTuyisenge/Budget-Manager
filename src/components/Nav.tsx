import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 mb-12 pb-5 z-1">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-xl font-bold">My Finance App</h1>
                <div className="flex space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white">
                        Home
                    </Link>
                    <Link to="/budget" className="text-gray-300 hover:text-white">
                        Budget
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
