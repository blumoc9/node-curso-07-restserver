const {request, response} = require('express');

const Role = require('../models/role');
const User = require('../models/user');
const {Category} = require("../models");


const isValidRole = async (role = '') => {

    const existRole = await Role.findOne({role});
    if (!existRole) {
        throw new Error(`The Role: ${role} doesn't exist`);
    }
}

const isValidEmail = async (email = '')=>{
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error(`The email: ${email} exist!`);
    }
}

const existUserById = async(id)=>{

    const existUser = await User.findById(id);

    if(!existUser){
        throw new Error(`The id: ${id} doesn's exist`);
    }
}

const existCategoryById = async(id)=>{
    const existCategory =  await Category.findById(id);
    if(!existCategory){
        throw new Error(`The id: ${id} doesn's exist`);
    }
}

module.exports = {
    isValidRole,isValidEmail,existUserById,existCategoryById
}

