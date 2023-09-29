import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Credentials from "./Components/Credentials/Credentials";
import TransactionsData from "./Components/TransactionsData/TransactionsData";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Credentials />} />
        <Route path="/chart" element={<TransactionsData />} />
      </Routes>
    </Router>
  );
}

export default App;
