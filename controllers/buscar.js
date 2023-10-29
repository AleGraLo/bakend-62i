const { request, response } = require("express");

//importar ObjectId de mongoose Types
const { ObjectId } = require("mongoose").Types;

//Importar los modelos de categoria y productos
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

//definir colecciones permitidas
const coleccionesPermitidas = ["categorias", "productos"];

//Función para buscar por categoria------------------------

const buscarCategoria = async (termino, res = response) => {
  //verificar si en vez del nombre manda el id
  const isMongoId = ObjectId.isValid(termino);
  if (isMongoId) {
    const categoria = await Categoria.findById(termino).populate(
      "usuario",
      "name"
    );
    return res.json({
      results: categoria ? [categoria] : [], //results:[]
    });
  }

  //si la búsqueda se hace por el nombre
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "name");

  res.json({
    results: categorias,
  });
};

//Funcion para buscar por producto--------------------------
const buscarProducto = async (termino, res = response) => {
  //verificar si en vez del nombre manda el id
  const isMongoId = ObjectId.isValid(termino);
  if (isMongoId) {
    const producto = await Producto.findById(termino)
      .populate("usuario", "name")
      .populate("categoria", "nombre");
    return res.json({
      results: producto ? [producto] : [], //results:[]
    });
  }

  //si la búsqueda se hace por el nombre
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  })
    .populate("usuario", "name")
    .populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

//crear la funcion de busqueda flexible

const buscar = async (req = request, res = response) => {
  //traer los parámetros de la coleccion y del termino
  const { coleccion, termino } = req.params;

  //verificar si la coleccion es válida
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProducto(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "no se generaron las búsquedas",
      });
      break;
  }
};

module.exports = {
  buscar,
};
