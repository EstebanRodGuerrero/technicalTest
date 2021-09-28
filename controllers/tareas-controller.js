const { response , request } = require('express');

const Tarea = require('../models/tarea');


    // CREAR tarea
    const postTarea = async ( req , res = response ) => {

        // Extraccion de dato
        const { _id , ...resto } = req.body;
        const nombre = resto.nombre.toUpperCase();


        // Validacion existencia de tarea
        const tareaDB = await Tarea.findOne({ nombre });
        if ( tareaDB ) { 
            return res.status(400).json({
                msg: `La tarea ya existe`
            })
        }


        // Generar la data a guardar
        const data = {
            ...resto,
            nombre
        }


        // Creo un modelo de Tarea con la data
        const tarea = new Tarea( data );


        // Guarda Producto en DB
        await tarea.save();


        
        res.status(201).json( tarea );

    }



    // ACTUALIZA tarea
    const putTarea = async ( req , res ) => {

        // Extraccion de datos
        const { id } = req.params;
        let { estado } = req.body;
        let fechaModify = new Date();

        // Estandarizacion de formato
        estado = estado.toUpperCase();

        // Actualiza datos
        const tarea = await Tarea.findByIdAndUpdate( id , ({ estado } , { fechaModify }) , { new: true } );

        res.json({
            tarea
        })
    }



    // ELIMINA tarea
    const deleteTarea = async ( req , res ) => {

        const { id } = req.params;
        const tarea = await Tarea.findByIdAndDelete( id );

        res.json({
            tarea
        })
    }




module.exports = {
    deleteTarea,
    postTarea,
    putTarea
}