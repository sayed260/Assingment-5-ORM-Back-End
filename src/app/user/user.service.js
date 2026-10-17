const userRepository = require('./user.repository')





const createUser = async (name, email, Password) => {

    //1- check if user already exists
    const userExist = await userRepository.findUserByEmail(email);
    if (userExist) {
        const error = new Error('Email already exists');
        error.statusCode = 409;
        throw error;
    }
    // check password length
    if (!userRepository.checkPasswordLength(Password)) {
        const error = new Error('Password must be longer than 6 characters');
        error.statusCode = 400;
        throw error;
    }
    // check name length
    if (!userRepository.checkNameLength(name)) {
        const error = new Error('Name must be longer than 2 characters');
        error.statusCode = 400;
        throw error;
    }
    // check email format
    if (!userRepository.checkEmail(email)) {
        const error = new Error('Invalid email format');
        error.statusCode = 400;
        throw error;
    }

    const user = await userRepository.createUser(name, email, Password);


}

// const updateUser = async (id, name, email, Password) => {
//     //1- check if user already exists
//     const userExist = await userRepository.findUserByEmail(email);
//     if (userExist && userExist.id !== id) {
//         const error = new Error('Email already exists');
//         error.statusCode = 409;
//         throw error;
//     }
//     const user = await userRepository.updateUser(id, name, email, Password);
// }

const upsertUser = async (id, name, email, password) => {
    const userExist = await userRepository.findUserByEmail(email);
    if (userExist && userExist.id !== id) {
        const error = new Error('Email already exists');
        error.statusCode = 409;
        throw error;
    }
    // This endpoint intentionally skips the service-layer field validators.
    return userRepository.upsertUser(id, name, email, password);
}



const getUserByEmail = async (email) => {

    const user = await userRepository.findUserByEmail(email);   
    if (!user) {
        const error = new Error('no user found');
        error.statusCode = 404;
        throw error;
    }
    return user;
}

const getUserById = async (id)=>{
    const user = await userRepository.findUserById(id);
    if (!user) {
        const error = new Error('no user found');
        error.statusCode = 404;
        throw error;
    }
    return user;
}





module.exports = {
createUser,
upsertUser,
getUserByEmail,
getUserById,
};

