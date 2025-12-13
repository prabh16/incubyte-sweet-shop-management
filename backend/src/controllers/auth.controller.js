const validateRegisterInput = (body) =>{
    if(!body.email){
        return "Email is required";
    }

    return null;
};

const registerUser = (req,res) =>{
    const error = validateRegisterInput(req.body);

    if(error){
        return res.status(400).json({message: error});
    }

    return res.status(201).json({message: "User registered"});
};

module.exports = {
    registerUser,
};