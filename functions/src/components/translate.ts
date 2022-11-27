// const express = require("express");
import * as express from "express";
import * as translate from "@vitalets/google-translate-api";
const cors = require("cors");

const doTranslate = express();

// Automatically allow cross-origin requests
doTranslate.use(cors());

doTranslate.get("/", (req: express.Request, res: express.Response) => {
  res.send("hola translate");
});

doTranslate.post(
  "/",
  express.json(),
  (req: express.Request, res: express.Response) => {
    const data = req.body;
    console.log(data);
    translate(data.text, { from: "en", to: "es" })
      .then((response: any) => {
        console.log(response.text);
        //=> Ik spreek Nederlands!
        console.log(response.from.text.autoCorrected);
        //=> true
        console.log(response.from.text.value);
        //=> I [speak] Dutch!
        console.log(response.from.text.didYouMean);
        //=> false
        res.status(200).json({ text: response.text });
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
);

export default doTranslate;
