const S = require("fluent-json-schema");
const Ajv = require("ajv").default;
const logger = require("../config/winston");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

const validationMid = (schema) => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      logger.error(validate.errors);
      return res.status(400).send({ error: "Invalid Input" });
    }
    next();
  };
};

const loginSchema = S.object()
  .prop("email", S.string().format(S.FORMATS.EMAIL).required())
  .prop("password", S.string().minLength(8).required())
  .valueOf();

const registerSchema = S.object()
  .prop("email", S.string().format(S.FORMATS.EMAIL).required())
  .prop("firstName", S.string().minLength(2).maxLength(20).required())
  .prop("lastName", S.string().minLength(2).maxLength(20).required())
  .prop("phone", S.string().maxLength(10).minLength(10).required())
  .prop("password", S.string().minLength(8).required())
  .valueOf();

const addPetSchema = S.object()
  .prop("hypoallergenic", S.required())
  .prop("type", S.string().maxLength(10).required())
  .prop("color", S.string().maxLength(10).required())
  .prop("name", S.string().minLength(2).maxLength(20).required())
  .prop("height", S.string().maxLength(3).required())
  .prop("weight", S.string().maxLength(3).required())
  .prop("dietary", S.string().minLength(2).maxLength(50).required())
  .prop("breed", S.string().minLength(2).maxLength(20).required())
  .prop("bio", S.string().maxLength(85))
  .valueOf();

const changePassSchema = S.object()
  .prop("oldPass", S.string().minLength(8).required())
  .prop("newPass", S.string().minLength(8).required())
  .valueOf();

const editUserSchema = S.object()
  .prop("email", S.string().format(S.FORMATS.EMAIL).required())
  .prop("firstName", S.string().minLength(2).maxLength(20).required())
  .prop("lastName", S.string().minLength(2).maxLength(20).required())
  .prop("phone", S.string().maxLength(10).minLength(10).required())
  .prop("img", S.string().required())
  .prop("bio", S.string())
  .valueOf();

const editPetSchema = S.object()
  .prop("type", S.string().maxLength(10).required())
  .prop("name", S.string().minLength(2).maxLength(20).required())
  .prop("height", S.string().minLength(1).maxLength(3).required())
  .prop("weight", S.string().minLength(1).maxLength(3).required())
  .prop("color", S.string().maxLength(10).required())
  .prop("status", S.string().required())
  .prop("hypoallergenic", S.required())
  .prop("dietary", S.string().minLength(2).maxLength(50).required())
  .prop("breed", S.string().minLength(2).maxLength(20).required())
  .prop("bio", S.string().maxLength(85))
  .prop("newImg", S.string())
  .prop("img", S.string())
  .valueOf();

const setStatusSchema = S.object()
  .prop("status", S.string().required())
  .valueOf();

module.exports = {
  validationMid,
  registerSchema,
  loginSchema,
  addPetSchema,
  changePassSchema,
  editUserSchema,
  setStatusSchema,
  editPetSchema,
};
