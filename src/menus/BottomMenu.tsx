import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
  AssessmentRounded,
  TableViewRounded,
  RestaurantRounded,
} from "@mui/icons-material";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

export default function SimpleBottomNavigation(): ReactElement {
  const actionValues = ["Comidas", "Tabla HC", "Reportes"];
  const [value, setValue] = useState(actionValues[0]);
  const App = useContext(AppContext);

  const setTitle = (title: string) => {
    if (App.setTitle) {
      App.setTitle(title);
    }
  };

  useEffect(() => {
    setTitle(value);
  }, [value]);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue: string) => {
          setValue(newValue);
          setTitle(newValue);
        }}
      >
        <BottomNavigationAction
          label={actionValues[0]}
          value={actionValues[0]}
          icon={<RestaurantRounded />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label={actionValues[1]}
          value={actionValues[1]}
          icon={<TableViewRounded />}
          component={Link}
          to="/carb-table"
        />
        <BottomNavigationAction
          label={actionValues[2]}
          value={actionValues[2]}
          icon={<AssessmentRounded />}
          component={Link}
          to="/report"
        />
      </BottomNavigation>
    </Box>
  );
}
