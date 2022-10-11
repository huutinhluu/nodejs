import Ajv from "ajv";

export default (schema) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    console.log(req.method);
    const valid = validate(req.body);
    if (!valid) return res.status(400).json(validate.errors);
    next();
  };
};
