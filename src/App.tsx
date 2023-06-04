import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import BottomMenu from "./menus/BottomMenu";

import AppBar from "./menus/AppBar";
import { AppContext } from "./AppContext";
import Paper from "@mui/material/Paper";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FoodRegistrationForm from "./register/FoodRegistrationForm";
import CarbosTable from "./information/CarbosTable";
import MealsReport from "./reports/MealsReport";
import { dark, light } from "./colors";
import { Box } from "@mui/material";

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
    <Box>
      <AppContext.Provider value={values}>
        <Router>
          <AppBar ref={ref} />
          <Container
            maxWidth="xl"
            disableGutters={false}
            sx={{
              backgroundColor: `${light}`,
              minHeight: `calc(100vh - ${divHeight}px - ${bottomDivHeight}px)`,
              color: `${dark}`,
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <FoodRegistrationForm
                    date={""}
                    time={""}
                    food={""}
                    carbohydrates={0}
                    glucemia={0}
                    observations={""}
                    meal={0}
                  />
                }
              />
              <Route path="/carb-table" element={<CarbosTable />} />
              <Route path="/report" element={<MealsReport />} />
            </Routes>
          </Container>
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
            ref={bottomRef}
          >
            <BottomMenu />
          </Paper>
        </Router>
      </AppContext.Provider>
    </Box>
  );
}

export default App;
