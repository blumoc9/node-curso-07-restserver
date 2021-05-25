const {response} = require("express");
const {Category: CategoryController} = require('../models')

const  createCategory = async (req, res= response)=>{

    const name = req.body.name.toUpperCase();

    const categoryDB = await CategoryController.findOne({name});
    if(categoryDB){
        return res.status(400).json({
            message: `The Category ${name} exist`
        })
    }

    //Generar data a guardar
    const data = {
        name,
        user: req.userAuth.uid
    }
    const category = new CategoryController(data);

    //save in DB
    await category.save();
    res.status(201).json(category);
}


module.exports = {
    createCategory
}
