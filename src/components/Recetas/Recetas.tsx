import React from "react";
import { Grid, Select } from "@material-ui/core";

export default function Recetas() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Recetas</h1>
        <p>Busca tu receta o agrega una nueva</p>
        <Select fullWidth variant="filled" color="primary"></Select>
      </Grid>
      <Grid item xs={12} sm={7} container>
        <h3>Receta</h3>
      </Grid>
      <Grid item xs={12} sm={5}>
        <h3>Valores nutricionales</h3>
      </Grid>
    </Grid>
  );
}
