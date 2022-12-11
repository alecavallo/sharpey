import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import BottomMenu from "./menus/BottomMenu";
import AppBar from "./menus/AppBar";
import { AppContext } from "./AppContext";
import Paper from "@mui/material/Paper";

function App() {
  const [title, setTitle] = useState("Bienvenidos");
  const [divHeight, setDivHeight] = useState(0);
  const [bottomDivHeight, setBottomDivHeight] = useState(0);
  const values = {
    title,
    setTitle,
  };

  const ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setDivHeight(ref.current.clientHeight);
    }
    if (bottomRef.current) {
      setBottomDivHeight(bottomRef.current.clientHeight);
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <AppContext.Provider value={values}>
        <AppBar ref={ref} />
        <Container
          maxWidth={false}
          disableGutters={false}
          sx={{
            backgroundColor: "blue",
            minHeight: `calc(100vh - ${divHeight}px - ${bottomDivHeight}px)`,
          }}
        >
          <h1 style={{ display: "inline-block" }}>Este es mi contenido</h1>
        </Container>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
          ref={bottomRef}
        >
          <BottomMenu />
        </Paper>
      </AppContext.Provider>
    </Container>
  );
}

export default App;
