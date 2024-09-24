import Nav from "./Nav";
import Footer from "./Footer";
import expenses from "../assets/expenses.jpg";
import income from "../assets/income.jpg";
import goals from "../assets/goals.jpg";
import insights from "../assets/insights.jpg";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Nav />
            <div className="min-h-screen flex flex-col">
                <div className="flex-grow bg-white flex flex-col items-center justify-center p-8 px-8 mt-10">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-blue-600 mb-6">Welcome to Your Budget Manager!</h1>
                        <p className="text-lg text-gray-700 mb-4">
                            Manage your finances with style and confidence.
                        </p>
                        <p className="text-md text-gray-500 mb-8">
                            Track your income, expenses, and stay on top of your budget!
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                            <Link to="/budget">Get Started</Link>
                        </button>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                        <div className="bg-blue-100 shadow-lg rounded-lg p-6 text-center">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Track Your Income</h2>
                            <p className="text-gray-600 mb-4">
                                Easily add and categorize your income sources for better insights.
                            </p>
                            <img src={income} alt="Income" className="w-32 mx-auto mb-4" />
                        </div>

                        <div className="bg-blue-100 shadow-lg rounded-lg p-6 text-center">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Manage Your Expenses</h2>
                            <p className="text-gray-600 mb-4">
                                Keep an eye on your expenses and find ways to save.
                            </p>
                            <img src={expenses} alt="Expenses" className="w-32 mx-auto mb-4" />
                        </div>

                        <div className="bg-blue-100 shadow-lg rounded-lg p-6 text-center">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Set Your Goals</h2>
                            <p className="text-gray-600 mb-4">
                                Create financial goals and track your progress.
                            </p>
                            <img src={goals} alt="Goals" className="w-32 mx-auto mb-4" />
                        </div>

                        <div className="bg-blue-100 shadow-lg rounded-lg p-6 text-center">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Get Insights</h2>
                            <p className="text-gray-600 mb-4">
                                Analyze your spending habits and make informed decisions.
                            </p>
                            <img src={insights} alt="Insights" className="w-32 mx-auto mb-4" />
                        </div>
                    </div>
                </div>
            <Footer />
            </div>
        </>
    );
}

export default Home;
