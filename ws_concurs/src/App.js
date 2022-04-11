import Form from "./components/Signup_Form/Form";
import Navbar from "./components/NavBar/navBar";
import Header from "./components/Header/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErorrPage from "./components/ErorrPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <Header />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
              <Form />
          }
        />

        <Route path="*" element={<ErorrPage />} />
      </Routes>
    </Router>
  );
}

export default App;
