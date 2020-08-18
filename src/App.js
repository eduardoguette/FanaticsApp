import React from "react";
import "./Styles/scss/styles.css";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PerfilUsuario from "./Components/PerfilUsuario";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/user/:id" component={PerfilUsuario} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Login} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
