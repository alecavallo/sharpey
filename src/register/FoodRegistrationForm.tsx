import React, { ChangeEventHandler, FormEvent, useState } from "react";

import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
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
  meal: number;
}
const locales = ["en-us", "en-gb", "es-Es"];
const mealType = ["desayuno", "almuerzo", "merienda", "cena", "colación"];
const breakfast = moment("8:00am");
const lunch = moment("1:00pm");
const snack = moment("6:00pm");
const dinner = moment("9:00pm");

type LocaleKey = (typeof locales)[number];
const FoodRegistrationForm = (props: FormDataProps) => {
  const [date, setDate] = React.useState<Moment | null>(moment());
  const [locale, setLocale] = useState<LocaleKey>("es-es");
  const [food, setFood] = useState(props.food);
  const [carbohydrates, setCarbohydrates] = useState(props.carbohydrates);
  const [glucemia, setGlucemia] = useState(props.glucemia);
  const [observations, setObservations] = useState(props.observations);
  const [open, setOpen] = useState(false);
  const [meal, setMeal] = useState(props.meal);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "food":
        setFood(value);
        break;
      case "carbs":
        if (value) {
          setCarbohydrates(parseInt(value));
        }
        break;
      case "glucemia":
        if (value) {
          setGlucemia(parseInt(value));
        }
        break;
      case "obs":
        setObservations(value);
        break;

      default:
        break;
    }
  };

  const handleMealChange = (event: SelectChangeEvent<string>) => {
    setMeal(parseInt(event.target.value));
  };

  const calculateMeal = (time: Moment | null): string => {
    if (!time) return "";
    let endRange = breakfast.add(1, "hour").add(30, "minutes");
    let startRange = breakfast.subtract(30, "minutes");
    if (time.isAfter(startRange) && time.isBefore(endRange)) {
      return mealType[0];
    }

    endRange = lunch.add(1, "hour").add(30, "minutes");
    startRange = lunch.subtract(30, "minutes");
    if (time.isAfter(startRange) && time.isBefore(endRange)) {
      return mealType[1];
    }

    endRange = snack.add(1, "hour").add(30, "minutes");
    startRange = snack.subtract(30, "minutes");
    if (time.isAfter(startRange) && time.isBefore(endRange)) {
      return mealType[2];
    }

    endRange = dinner.add(1, "hour").add(30, "minutes");
    startRange = dinner.subtract(30, "minutes");
    if (time.isAfter(startRange) && time.isBefore(endRange)) {
      return mealType[2];
    }

    return mealType[5];
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
        <Grid item sm={2} xs={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="meal">Tipo de comida</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="meal"
              name="meal"
              value={meal.toString()}
              onChange={handleMealChange}
              label="Tipo de comida"
            >
              {mealType.map((m, i) => (
                <MenuItem key={i} value={i}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={2} xs={4}>
          <TextField
            id="food"
            name="food"
            label="Comida"
            variant="standard"
            value={food}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item sm={1} xs={4}>
          <TextField
            id="carbs"
            name="carbs"
            label="Carbohidratos"
            variant="standard"
            value={carbohydrates}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={1} xs={4}>
          <TextField
            id="glucemia"
            name="glucemia"
            label="Glucemia"
            variant="standard"
            value={glucemia}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={3} xs={4}>
          <TextField
            id="obs"
            name="obs"
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
          Comida registrada!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FoodRegistrationForm;
