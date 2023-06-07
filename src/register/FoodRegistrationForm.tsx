import React, { FormEvent, useEffect, useState } from "react";

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
import TakePicture from "../components/TakePicture";

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
const breakfast = moment("8:00 am", "h:mm a");
const lunch = moment("1:00 pm", "h:mm a");
const snack = moment("6:00 pm", "h:mm a");
const dinner = moment("9:00 pm", "h:mm a");

type LocaleKey = (typeof locales)[number];
const FoodRegistrationForm = (props: FormDataProps) => {
  const locale: LocaleKey = "es-es";
  // const [locale, setLocale] = useState<LocaleKey>("es-es");
  const [date, setDate] = React.useState<Moment | null>(moment());
  const [food, setFood] = useState(props.food);
  const [carbohydrates, setCarbohydrates] = useState(props.carbohydrates);
  const [glucemia, setGlucemia] = useState(props.glucemia);
  const [observations, setObservations] = useState(props.observations);
  const [open, setOpen] = useState(false);
  const [meal, setMeal] = useState(props.meal);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const meal = calculateMeal(date);
    setMeal(meal);
  }, [date]);

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

  const handleChangeDateTime = (
    newValue: React.SetStateAction<Moment | null>
  ) => {
    setDate(newValue);
  };
  const calculateMeal = (time: Moment | null): number => {
    if (!time) return 5;
    let endRange = moment(breakfast).add(1, "hour").add(30, "minutes");
    let startRange = moment(breakfast).subtract(30, "minutes");
    if (time.isAfter(startRange) && time.isBefore(endRange)) {
      return 0;
    }

    endRange = moment(lunch).add(1, "hour").add(30, "minutes");
    startRange = moment(lunch).subtract(30, "minutes");
    if (time.isAfter(startRange) && time.isBefore(endRange)) {
      return 1;
    }

    endRange = moment(snack).add(1, "hour").add(30, "minutes");
    startRange = moment(snack).subtract(30, "minutes");
    if (time.isAfter(startRange) && time.isBefore(endRange)) {
      return 2;
    }

    endRange = moment(dinner).add(1, "hour").add(30, "minutes");
    startRange = moment(dinner).subtract(30, "minutes");
    if (time.isAfter(startRange) && time.isBefore(endRange)) {
      return 3;
    }

    return 4;
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
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems={"flex-end"}
      >
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
              onChange={handleChangeDateTime}
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
        <Grid item sm={6} xs={12}>
          <TakePicture imgData={image} setImgData={setImage} />
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
