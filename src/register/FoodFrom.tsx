import { Box, Button, Grid } from "@mui/material";
import React from "react";

export default function FoodFrom() {
  return (
    <Box>
      <h3>Registro de comidas</h3>
      <form>
        <Grid container spacing={2}>
          <Grid item sm={1} xs={4}>
            fecha
          </Grid>
          <Grid item sm={1} xs={4}>
            hora
          </Grid>
          <Grid item sm={3} xs={12}>
            comida
          </Grid>
          <Grid item sm={1} xs={4}>
            glucemia
          </Grid>
          <Grid item sm={1}>
            Carbohidratos
          </Grid>
          <Grid item sm={3}>
            Observaciones
          </Grid>
          <Grid item sm={1}>
            Acciones
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={1} xs={4}>
            17/07/1982
          </Grid>
          <Grid item sm={1} xs={4}>
            15:00
          </Grid>
          <Grid item sm={3} xs={12}>
            1 Milanesa, 1 taza de papas firtas. 2 bochas de helado
          </Grid>
          <Grid item sm={1} xs={4}>
            129
          </Grid>
          <Grid item sm={1}>
            75
          </Grid>
          <Grid item sm={3}>
            Eiusmod fugiat magna proident nostrud mollit aliqua ea qui sint.
            Elit sint quis dolor culpa velit nulla labore consectetur sint
            aliquip sunt dolore aute. Dolor aliqua mollit dolore duis proident
            sint nostrud culpa ea pariatur elit quis do. Aliqua cillum culpa
            veniam do minim amet cupidatat id laborum commodo irure aliqua
            mollit. Dolore culpa eu eiusmod sint est qui enim mollit nulla
            cillum incididunt magna elit.
          </Grid>
          <Grid container spacing={2} item sm={2}>
            <Grid item xs={4}>
              <Button variant="contained" size="small">
                A
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" size="small">
                B
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
