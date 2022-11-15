// import { User } from '../../components/user/user.models';
// const user = new User()

// const userInf ={
//     firstname: 'Alaa',
//     lastname: 'test',
//     email: 'alaa1@gmail.com',
//     password: '123456',
// }

// describe('Testing User Model: ', () => {

//     it('Creates a new User', async () => {

//         expect(async () => {
//             const result = await user.createUser(userInf)
//         }).not.toThrow();


//     })
//     it('User Logs in', async () => {

//         expect(async () => {
//             const result = await user.Authenticate(userInf.email,userInf.password)
//         }).not.toThrow();

//     })
//     it('Get All Users', async () => {

//         expect(async () => {
//             const result = await user.allUsers()
//         }).not.toThrow();
//     })
//     it('Get User By ID', async () => {

//         expect(async () => {
//             const result = await user.findUserById(1)
//         }).not.toThrow();
        

//     })

//     it('Update user information', async () => {

//         expect(async () => {
//             const result = await user.update('email','test@test.com',1)
//             expect(result.firstname).toEqual(userInf.firstname)
//         }).not.toThrow();

//     })
//     it('Delete User', async () => {
//         expect(async () => {
//             const result = await user.deleteUser(1)
//             const usersNumber = await user.allUsers()
//             expect(usersNumber?.length).toEqual(0)
//         }).not.toThrow();
// })

// })
