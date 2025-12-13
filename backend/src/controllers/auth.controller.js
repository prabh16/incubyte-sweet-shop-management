const registerUser = (req,res) =>{
    const {email} = req.body;

    if(!email){
        return res.status(400).json({message: "Email is required"});
    }
    
    return res.status(201).json({message: "User registered"});
};

module.exports = {
    registerUser,
};