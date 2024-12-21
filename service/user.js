const bcrypt = require('bcryptjs');
const mongooseUser = require('../model/user')

async function createUser(userParams) {
    const {username,email,password} = userParams;
    try {
        if(!email || !password || !username){
            console.log('##service #UserCreate: Email, password and username are required');
            return { success: false, responseMessage: 'Email, password and username are required', responseObject: null };
        }

        // Check if a user with the same email exists
        const existingUser = await mongooseUser.findOne({ email });

        if (existingUser) {
            console.log('##service #UserCreate: User already exists with this email');
            return { success: false, responseMessage: 'User with this email already exists', respondObject: null };
        }

        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new mongooseUser({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save();
        return { success: true, responseMessage: 'User created successfully.', responseObject: newUser.toJSON() };
    } catch (error) {
        console.log('Error ##service #UserCreate: ', error);
        return { success: false, responseMessage: '#Service #UserCreate ERROR: ${error}', responseObject: null };
    }
}

async function updateUser(userParams){
    const id = userParams.id;
    const email = userParams.email;

    try {
        const user = await mongooseUser.findById(id);
        if(!user){
            console.error('User with ID ${id} not found.');
            return {success:false, responseMessage:"User with ID(" + id + ") not found.", responseObject: null};
        }

        // Check if a user with the same email exists
        const existingUser = await mongooseUser.findOne({ email });

        if (email != null && existingUser) {
            const emailInUse = user.email != existingUser.email
            if(emailInUse){
                console.log('##service #UserCreate: User already exists with this email');
                return { success: false, responseMessage: 'User with this email already exists', responseObject: null};
            }
        }

        user.email = email;
        const updatedUser = await user.save();
        console.log('#Service /UpdateUser:', updatedUser);
        return {success: true, responseMessage:"User updated successfully", responseObject:updatedUser.toJSON()};

    } catch (error) {
        console.log('Error ##service #UpdateUser: ', error);
        message = "Error #UpdateUser: " + error.message
        return { success: false, responseMessage: message, responseObject: null};
    }
}

async function deleteUser(userParams){
    const id = userParams.id;
    try{

        const userDeleted = await mongooseUser.findByIdAndDelete(id);
        if(!userDeleted){
            return {success:false, responseMessage:"User with ID(" + id + ") not found.", responseObject: null};
        }   
        return {success: true, responseMessage:"User deleted successfully", responseObject: userDeleted.toJSON()};

    }catch(e){
        console.log('Error ##service #DeleteUser: ', e);
        message = "Error #DeleteUser: " + e.message
        return { success: false, responseMessage: message, responseObject: null};
    }
}

async function getUserById(userParams){
    const id = userParams.id;
    try {
        const user = await mongooseUser.findById(id);
        if(!user){
            return {success:false, responseMessage:"User with ID(" + id + ") not found.", responseObject: null};
        }
        return {success: true, responseMessage:"User updated successfully", responseObject:user.toJSON()};        
    } catch (error) {
        console.log('Error ##service #getUserById: ', error);
        message = "Error #DeleteUser: " + error.message
        return { success: false, responseMessage: message, responseObject: null};    
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById
}