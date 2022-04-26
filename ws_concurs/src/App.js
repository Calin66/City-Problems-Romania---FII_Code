import React from "react";
import Form from "./components/Signup_Form/Form";
import Navbar from "./components/NavBar/navBar";
import Header from "./components/Header/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErorrPage from "./components/ErorrPage";
import Postare from "./components/Postari/postare";
import DetaliiCont from "./components/Pages/DetaliiCont";
import FormLogin from "./components/Signup_Form/FormLogin";
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
        <Route path="/creeazapostare" element={<Postare />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/detaliicont" element={<DetaliiCont />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="*" element={<ErorrPage />} />
      </Routes>
    </Router>
  );
}

export default App;
