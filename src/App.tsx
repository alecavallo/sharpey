import React, { useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import BottomMenu from "./menus/BottomMenu";
import AppBar from "./menus/AppBar";
import { AppContext } from "./AppContext";

function App() {
  const [title, setTitle] = useState("Bienvenidos");
  const values = {
    title,
    setTitle,
  };
  return (
    <Container maxWidth="xl">
      <AppContext.Provider value={values}>
        <AppBar />
        <h1>Este es mi contenido</h1>
        <BottomMenu />
      </AppContext.Provider>
    </Container>
  );
}

export default App;
