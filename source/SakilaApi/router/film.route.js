import express from "express";
import filmModel from "../models/film.model.js";
import compile from "../middlewares/validation.mdw.js";
import filmSchema from "../schemas/film.schema.js";
import {logger4js} from "../logger/log.js";

const router = express.Router();
const validate = compile(filmSchema);

//Get all films
router.get("/", async (req, res) => {
  logger4js.debug(`IN - get all films`)
  let films = await filmModel.findAll();
  logger4js.debug(`Number films get all: ${films.lenght}`)
  logger4js.debug(`OUT - get all actor`)
  res.json(films);
});

//Get film for given id
router.get("/:id", async (req, res) => {
  logger4js.debug(`IN - get film by id`)
  let filmID = req.params.id;
  logger4js.debug(`filmID: ${filmID}`)
  let film = await filmModel.findByID(filmID);
  logger4js.debug(`OUT - get film by id, film: %j`, film)
  res.json(film);
});

//Delete film for given id
router.delete("/:id", async (req, res) => {
  logger4js.debug(`IN - delete film by id`)
  let filmID = req.params.id;
  logger4js.debug(`filmID: ${filmID}`)
  let result = await filmModel.delete(filmID);
  if (result >= 0) {
    logger4js.debug(`OUT - result ${result}`)
    res.json({ affected: result });
  } else {
    logger4js.debug(`OUT - result ${result}`)
    res.json(result);
  }
});

router.use(validate);
//Create new film
router.post("/", async (req, res) => {
  logger4js.debug(`IN - add new film`)
  let filmData = req.body;
  logger4js.debug(`filmData: %j`, filmData)
  if (filmData?.special_features) {
    let { special_features } = filmData;
    filmData.special_features = special_features.join(",");
  }
  let result = await filmModel.insert(filmData);
  if (result > 0) {
    logger4js.debug(`OUT - result ${result}`)
    let filmInserted = await filmModel.findByID(result);
    res.json(filmInserted);
  } else {
    logger4js.debug(`OUT - result ${result}`)
    res.json(result);
  }
});

//Update film for given id
router.put("/:id", async (req, res) => {
  logger4js.debug(`IN - update film by id`)
  let filmID = req.params.id;
  logger4js.debug(`filmID: ${filmID}`)
  let filmData = req.body;
  logger4js.debug(`filmData: %j`, filmData)
  if (filmData?.special_features) {
    let { special_features } = filmData;
    filmData.special_features = special_features.join(",");
  }
  let result = await filmModel.update(filmID, filmData);
  if (result >= 0) {
    logger4js.debug(`OUT - result ${result}`)
    res.json({ changed: result });
  } else {
    logger4js.debug(`OUT - result ${result}`)
    res.json(result);
  }
});

export default router;
