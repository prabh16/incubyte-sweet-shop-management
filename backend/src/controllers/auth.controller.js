const registerValidationRules = [
    {
        check: ({email}) => !email,
        message: "Email is required",
    },

    {
        check: ({password}) => !password,
        message: "Password is required",
    },

    {
        check: ({password}) => password && password.length < 6,
        message: "Password must be at least 6 characters long",
    },
];

const validateRegisterInput = (body) =>{
    for(const rule of registerValidationRules){
        if(rule.check(body)){
            return rule.message;
        }
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