const { check, body, validationResult } = require("express-validator");

const validationRegister = [
  check().custom((value, { req }) => {
    if (typeof req.body !== "object" || req.body === null) {
      throw new Error("El cuerpo de la solicitud tiene un formato incorrecto.");
    }
    return true;
  }),
  body("nombre")
    .trim()
    .isLength({ min: 1 })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]*$/),
  body("telefono").trim().isLength({ min: 1, max: 10 }).isNumeric(),
  body("correo").trim().isLength({ min: 1 }).isEmail(),
  body("lugar")
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[a-zA-ZÀ-ÿ0-9\s,.'#-]*$/),
  body("fecha")
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[0-9\-]+$/),
  body("horario")
    .optional()
    .trim()
    .matches(/^\d{1,2}:\d{2}$/),
  body("paquete")
    .trim()
    .isLength({ min: 1 })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]*$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ type: "error", data: "Error en la Validación de Datos"});
    }
    next();
  },
];

module.exports = validationRegister;
