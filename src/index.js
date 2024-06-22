const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;

try {
  mongoose.connect(mongoUri);
  console.log("Conectado a MongoDB");
} catch (error) {
  console.error("Error de conexión", error);
}

const libroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
});


const Libro = mongoose.model("Libro", libroSchema);

//ruta

app.get("/api", (req, res) => {
  res.send("Bienvenido a la app de libros");
});

//crear un nuevo libro
app.post("/libros", async (req, res) => {
  const libro = new Libro({
    titulo: req.body.titulo,
    autor: req.body.autor,
  });

  try {
    await libro.save();
    res.json(libro);
  } catch (error) {
    res.status(500).send("Error al guardar el libro");
  }
});

app.get("/libros", async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).send("Error al obtener los libros", error);
  }
});

//Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor ejecutándose en http://localhost:3000/");
});

