import { Provider } from "react-redux";
import { store } from "./store/store";
import ExpenseForm from "./components/ExpenseForm";
import Nav from "./components/Nav";

function App() {
  return (
    <Provider store={store}>
        <Nav />
        <ExpenseForm />
    </Provider>
  );
}

export default App;
