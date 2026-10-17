const userService = require('./user.service');
const bcrupt = require('bcrypt');




const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body || {};
        await userService.createUser(name, email, password);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
}

// const updateUser = async (req, res, next) => {
//     try {
//         const { id } = req.params || {};
//         const { name, email, password } = req.body || {};
//         await userService.updateUser(id, name, email, password);
//         return res.status(200).json({ message: 'User updated successfully' });
//     } catch (error) {
//         next(error);
//     }
// }

const upsertUser = async (req, res, next) => {
    try {
        const { id } = req.params || {};
        const { name, email, password } = req.body || {};
        const user = await userService.upsertUser(id, name, email, password);
        return res.status(200).json({ message: 'User created or updated successfully', user });
    } catch (error) {
        next(error);
    }
}

const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.query || {};
        const user = await userService.getUserByEmail(email);
        return res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
}
const getUserById = async (req, res, next) => {

    try {
        const {id} = req.params || {};
        const user = await userService.getUserById(id);
        return res.status(200).json({ user });
        
    } catch (error) {
        next(error)
    }

}


module.exports = {
    createUser,
    upsertUser,
    getUserByEmail,
    getUserById
};

