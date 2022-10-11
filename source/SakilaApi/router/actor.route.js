import express from "express";
import actorModel from "../models/actor.model.js";
import compile from "../middlewares/validation.mdw.js";
import actorSchema from "../schemas/actor.schema.js";
import {logger4js} from "../logger/log.js";

const validate = compile(actorSchema);
const router = express.Router();

//Get all actors
router.get("/", async (req, res) => {
  logger4js.debug(`IN - get all actor`)
  let actors = await actorModel.findAll();
  logger4js.debug(`Number actor get all: ${actors.length}`)
  logger4js.debug(`OUT - get all actor`)
  res.json(actors);
});

//Get actor for given id
router.get("/:id", async (req, res) => {
  logger4js.debug(`IN - get actor by id`)
  let actorID = req.params.id;
  logger4js.debug(`actorID: ${actorID}`)
  let actor = await actorModel.findByID(actorID);
  logger4js.debug(`OUT - get actor by id, actor: ${actor}`)
  res.json(actor);
});

//Delete actor for given id
router.delete("/:id", async (req, res) => {
  logger4js.debug(`IN - delete actor by id`)
  let actorID = req.params.id;
  logger4js.debug(`actorID: ${actorID}`)
  let result = await actorModel.delete(actorID);
  if (result >= 0) {
    logger4js.debug(`OUT - delete actor by id, result:  ${result}`)
    res.json({ affected: result });
  } else {
    logger4js.debug(`OUT - delete actor by id, result:  ${result}`)
    res.json(result);
  }
});

router.use(validate);
//Create new actor
router.post("/", async (req, res) => {
  logger4js.debug(`IN - add new actor`)
  let actorData = req.body;
  logger4js.debug(`actorData: %j`, actorData)
  let result = await actorModel.insert(actorData);
  if (result > 0) {
    let actorInserted = await actorModel.findByID(result);
    logger4js.debug(`OUT - actorInserted:  %j`, actorInserted)
    res.json(actorInserted);
  } else {
    logger4js.debug(`OUT - result: ${result}`)
    res.json(result);
  }
});

//Update actor for given id
router.put("/:id", async (req, res) => {
  logger4js.debug(`IN - update actor`)
  let actorID = req.params.id;
  logger4js.debug(`actorID: ${actorID}`)
  let actorData = req.body;
  logger4js.debug(`actorData: %j`, actorData)
  let result = await actorModel.update(actorID, actorData);
  if (result >= 0) {
    logger4js.debug(`result: ${result}`)
    res.json({ changed: result });
  } else {
    logger4js.debug(`result: ${result}`)
    res.json(result);
  }
});

export default router;
