import { Provider } from "react-redux";
import { store } from "./store/store";
import ExpenseForm from "./components/ExpenseForm";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      {/* Container with flexbox to ensure footer stays at the bottom */}
      <div className="flex flex-col min-h-screen">
        {/* Header/Nav */}
        <Nav />

        {/* Main content with flex-grow to take remaining space */}
        <div className="flex-grow">
          <ExpenseForm />
        </div>

        {/* Footer sticks at the bottom */}
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
