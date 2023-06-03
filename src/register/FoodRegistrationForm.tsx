import React, { FormEvent, useState } from "react";

import { Alert, Box, Button, Grid, Snackbar, TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { deDE } from "@mui/x-date-pickers/locales";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import moment from "moment";
import "moment/locale/es";

interface FormDataProps {
  date: string;
  time: string;
  food: string;
  carbohydrates: number;
  glucemia: number;
  observations: string;
}
const locales = ["en-us", "en-gb", "es-Es"];

type LocaleKey = typeof locales[number];
const FoodRegistrationForm = (props: FormDataProps) => {
  const [date, setDate] = React.useState<Moment | null>(moment());
  const [locale, setLocale] = useState<LocaleKey>("es-es");
  const [food, setFood] = useState(props.food);
  const [carbohydrates, setCarbohydrates] = useState(props.carbohydrates);
  const [glucemia, setGlucemia] = useState(props.glucemia);
  const [observations, setObservations] = useState(props.observations);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "food":
        setFood(value);
        break;
      case "carbohydrates":
        setCarbohydrates(parseInt(value));
        break;
      case "glucemia":
        setGlucemia(parseInt(value));
        break;
      case "observations":
        setObservations(value);
        break;

      default:
        break;
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item sm={3} xs={4}>
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale={locale}
            localeText={
              deDE.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DateTimePicker
              label="Fecha"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={3} xs={4}>
          <TextField
            id="standard-basic"
            label="Comida"
            variant="standard"
            value={food}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item sm={1} xs={4}>
          <TextField
            id="standard-basic"
            label="Carbohidratos"
            variant="standard"
            value={carbohydrates}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={1} xs={4}>
          <TextField
            id="standard-basic"
            label="Glucemia"
            variant="standard"
            value={glucemia}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={3} xs={4}>
          <TextField
            id="standard-basic"
            label="Observaciones"
            variant="standard"
            value={observations}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FoodRegistrationForm;
