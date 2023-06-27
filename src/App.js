import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// Components 
import Header from "./Components/Header";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";


import ProtoctedRoute from "./Routing/ProtoctedRoute";
import PublicRouter from "./Routing/PublicRouter";
import ErrorPage from "./Pages/ErrorPage";


function App() {


  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/*" element={<ErrorPage />} />


        <Route element={<PublicRouter />}>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtoctedRoute />}>
          <Route path="/user-profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
