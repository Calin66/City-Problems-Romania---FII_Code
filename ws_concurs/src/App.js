import React from "react";
import Form from "./components/Signup_Form/Form";
import Navbar from "./components/NavBar/navBar";
import Header from "./components/Header/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErorrPage from "./components/ErorrPage";
import Postare from "./components/Postari/postare";
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
        <Route path="/creeazapostare" element={<Postare/>} />
        <Route path="/signup" element={<Form />} />
        <Route path="*" element={<ErorrPage />} />
      </Routes>
    </Router>
  );
}

export default App;
