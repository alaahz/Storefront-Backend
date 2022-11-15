import {Express} from 'express';
import {UserHandler} from './user.handlers';
import {verifyAuthToken} from '../../middlewares/verifyAuthToken'
import {checkEmail} from '../../middlewares/checkEmail'
const userHandler = new UserHandler();
const userRouters = (app:Express) =>{

    app.post('/signup', userHandler.SignUp)
    app.post('/signin', userHandler.SignIn)
    app.get('/users/allUsers',verifyAuthToken,userHandler.getAllUsers)
    app.get('/users/userInfo/:userId',verifyAuthToken,userHandler.getOneUser)
    app.put('/users/update/:userId',verifyAuthToken,userHandler.UpdateUser)
    app.delete('/users/delete/:userId',verifyAuthToken,userHandler.deleteUser)

}
export default userRouters;
