import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import Financial from "./pages/financial";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/financial/:id" element={<Financial />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
