import { Grid } from "@material-ui/core";
import React, { ReactElement, useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  GridContainer: {
    padding: theme.spacing(0),
  },
}));

export default function TablaCarbohidratos(): ReactElement {
  const classes = useStyles();
  const App = useContext(AppContext);
  useEffect(() => {
    if (App.setTitle) {
      App.setTitle("Valores de carbohidratos por alimentos");
    }
  }, [App]);
  return (
    <Grid container spacing={1} className={classes.GridContainer}>
      <Grid item xs={12}>
        filtros
      </Grid>
      <Grid item xs={12}>
        Tabla
      </Grid>
    </Grid>
  );
}
