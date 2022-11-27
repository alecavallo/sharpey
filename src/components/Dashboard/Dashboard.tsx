import { Button, Grid } from "@material-ui/core";
import React, { ReactElement, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AppContext } from "../../AppContext";
// import Axios from "axios";

export default function Dashboard(): ReactElement {
  const App = useContext(AppContext);
  // const [trans, setTrans] = useState("");

  /* useEffect(() => {
    if (App.setTitle) {
      App.setTitle("Panel de control");
    }
    const url = `${process.env.REACT_APP_API_ENDPOINT}/translate`;
    const data = {
      text: "Hello, I'm just a script",
    };
    Axios.post(url, data)
      .then((response) => {
        if (response.status === 200) {
          setTrans(response.data.text);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); */

  return (
    <HelmetProvider>
      <Helmet>
        <title>Comenzamos</title>
      </Helmet>
      {App.title}
      <Grid container>
        <Grid item xs={12}>
          <p>
            Sharpey es una aplicación diseñada con{" "}
            <span role="img" aria-label="amor">
              💓
            </span>{" "}
            para los padres, hijos y toda persona con Diabetes mellitus.
          </p>
          <p>
            Aqui podras encontrar tablas de valores de hidratos de carbono,
            valores nutricionales de recetas o subir tu propia receta para
            obtener los valores!
          </p>
        </Grid>
        <Grid item xs={12} sm={6} md={3}></Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" color="secondary" href="/carbohidratos">
            Carbohidratos por alimentos
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}></Grid>
      </Grid>
    </HelmetProvider>
  );
}
