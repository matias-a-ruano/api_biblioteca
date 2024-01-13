const express = require('express');
const route = express.Router();
const Libro = require("../models/libro");


route.get("/", async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
});

route.post("/", async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el Libro" });
    }
});

route.put("/:id", async (req, res) => { 
    try {
        await Libro.findByIdAndUpdate(req.params.id, req.body,
    {
        new: true,
    });
        res.json(Libro);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el Libro" });
    }
});

route.delete('/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Libro' });
    }
});

module.exports = route;
    