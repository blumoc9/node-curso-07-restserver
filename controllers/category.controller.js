const mongoose = require("mongoose");
const {request,response} = require("express");
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
        user: mongoose.Types.ObjectId(req.userAuth.uid)
    }
    const category = new CategoryController(data);

    //save in DB
    await category.save();
    res.status(201).json(category);
}

// get categories , paginated total and use populate of mongoose
const getCategories = async(req  = request, res= response)=>{
    const { limit = 5, from = 0} = req.query;
    const query = {status: true};

    const [total, categories] = await Promise.all([
        CategoryController.countDocuments(query),
        CategoryController.find(query).populate('User').skip(Number(from)).limit(Number(limit))
    ]);
    res.json({
        status: 200,
        total,
        categories,
    });

}

// get categoy , paginated total and use populate of mongoose
const getCategory = async(req  = request, res= response)=>{

}

const updateCategory = async(req  = request, res= response)=>{

}

// we need to change status only
const deleteCategory = async(req  = request, res= response)=>{

}



module.exports = {
    createCategory,getCategories, getCategory,updateCategory,deleteCategory
}
