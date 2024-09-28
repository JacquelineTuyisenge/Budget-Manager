import { Provider } from "react-redux";
import { store } from "./store/store";
import ExpenseForm from "./components/ExpenseForm";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
        <Nav />
        <ExpenseForm />
        <Footer />
    </Provider>
  );
}

export default App;
