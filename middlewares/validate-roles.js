

const {response} = require('express');




const isAdminRole = async(req,res = response,next) =>{

    if(!req.userAuth){
        return res.status(500).json({
            message: 'you need validate role of user without the token first'
        });
    }

    const{role, name} = req.userAuth;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            message: `${name} doesn't ADMIN_ROLE`
        });
    }

    next();
}

const hasRoles= ( ...roles)=>{

    return (req,res= response , next)=>{
        if(!req.userAuth){
            return res.status(500).json({
                message: 'you need validate role of user without the token first'
            });
        }

        if(!roles.includes(req.userAuth.role)){
            return res.status(401).json({
                message: `The Service require this roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole, hasRoles
}
