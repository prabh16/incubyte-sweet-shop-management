const validateRegisterInput = ({email,password}) =>{
    if(!email){
        return "Email is required";
    }

    if(!password){
        return "Password is required"; 
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