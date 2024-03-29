const express = require("express");
const predioController = express();
const { Op } = require("sequelize");
const { predioModel } = require("../models/PrediosModel");
const { lugarModel } = require("../models/LugaresModel");
const { matriculaModel } = require("../models/MatriculasModel");
const { JWTokenVerification } = require("../middleware/Authentication");
const { QueryTypes } = require('@sequelize/core');

// obtener un predio
predioController.get("/getProperty/:idProperty",[JWTokenVerification],(req, res) => {
    predioModel.findOne({
        where: {
          id_numero_predial: req.params.idProperty,
        },
      }).then((result) => {
        if (result) {
          const id_lugar = result.id_lugar;
          const address= '';
          const query = " call obtain_property_address(:id_lugar)";
          lugarModel.sequelize.query(
            query,
            {type: QueryTypes.select,
            replacements:{id_lugar: result.id_lugar, address:''}
        }).then((resultProperty) =>{
          result.dataValues.direccion_predio = resultProperty[0];
                    const id_numero_predial = result.id_numero_predial;
                    const queryMatricules = "call obtain_matricula_by_property(:id_numero_predial);"
                    matriculaModel.sequelize.query(
                        queryMatricules,
                        {type: QueryTypes.select,
                        replacements:{id_numero_predial: result.id_numero_predial}
                    }).then((resultMatriculas) =>{
                        result.dataValues.matriculas = resultMatriculas;
                        res.status(200).json({ ok: true, result: result });
                    })
        });
        } else {
            res.status(200).json({ ok: false, message: "El Id del predio no existe" });
        }
      }).catch((err) => {
        res.status(500).json({ok: false,message: "Error al conectarse a la base de datos",error: err,
          });
      });
  }
);

//validar si un predio existe
predioController.get("/getPropertyByID/:id_property", (req, res) => {
  predioModel.findOne({
    where: {id_numero_predial : req.params.id_property},

      attributes: ["id_numero_predial", "nombre_predio"],
    })
    .then((result) => {
      if (result) {
        return res.status(200).json({ ok: true, result: result });
      } else {
        return res.status(400).json({ ok: false, message: "No existen registros de Predios asociados a la búsqueda"  });
      }
      
    })
    .catch((err) => {
      return res.status(400).json({ ok: false, error: err });
    });
});

// crear un predio
predioController.post("/addProperty",[JWTokenVerification], (req, res) => {
  let newPredio = predioModel.build({
    id_numero_predial: req.body.id_numero_predial,
    numero_predial_anterior: req.body.numero_predial_anterior,
    direccion_predio: req.body.direccion_predio,
    nombre_predio: req.body.nombre_predio,
    area_predio: Number(req.body.area_predio),
    area_construccion: Number(req.body.area_construccion),
    destino_economico_predio: req.body.destino_economico_predio,
    id_lugar: Number(req.body.id_lugar),
  });
  predioModel.findOne({
      where: {
        [Op.or]: [{ id_numero_predial: req.body.id_numero_predial }],
      },
    })
    .then((result) => {
      if (!result) {
        newPredio.save().then(() => {
            res.status(200).json({
                ok: true,
                message: "El predio ha sido agregado correctamente",
              });
          })
          .catch((err) => {
            res
              .status(500)
              .json({
                ok: false,
                message: "Error al agregar el predio",
                error: err,
              });
          });
      } else {
        res.status(200).json({ ok: false, message: "El predio ya existe" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          ok: false,
          message: "Error al conectarse a la base de datos",
          error: err,
        });
    });
});

//modificar predio: nombre predio, destino economico, area construida
predioController.post("/updateProperty", [JWTokenVerification], (req, res) => {
  predioModel
    .findOne({
      where: {
        [Op.or]: [{ id_numero_predial: req.body.id_numero_predial }],
      },
    })
    .then((result) => {
      if (result) {
        result.nombre_predio = req.body.nombre_predio;
        result.destino_economico_predio = req.body.destino_economico_predio;
        result.area_predio = Number(req.body.area_predio);
        result.area_construccion = Number(req.body.area_construccion);
        result.save().then(() => {
            res.status(200).json({
                ok: true,
                message:
                  "Los datos del predio han sido modificados correctamente",
              });
          })
          .catch((err) => {
            res.status(500).json({
                ok: false,
                message: "Error al editar los datos del predio",
                error: err,
              });
          });
      } else {
        res.status(200).json({ ok: false, message: "El predio no existe" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          ok: false,
          message: "Error al conectarse a la base de datos",
          error: err,
        });
    });
});

//obtener todos los predios
predioController.get("/getProperties", (req, res) => {
  predioModel
    .findAll({
      attributes: ["id_numero_predial", "nombre_predio"],
    })
    .then((result) => {
      return res.status(200).json({ ok: true, result: result });
    })
    .catch((err) => {
      return res.status(400).json({ ok: false, error: err });
    });
});

module.exports = { predioController };
