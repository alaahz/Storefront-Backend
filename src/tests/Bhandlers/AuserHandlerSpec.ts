import app from '../../server'
import supertest from 'supertest';



const request =  supertest(app)

describe('Testing User Endpoint: ', function() {

    const testUser = {
        firstname: 'Alaa',
        lastname: 'Alhazmi',
        email: 'alaahz@test.com',
        password: '12345',

    }
    let token ='';
    // beforeAll used to call signin endpoint and generate token to use it in each case 
    beforeAll( async function(){
      const response = await request.post('/signin')
      .send({
        email: 'alaahz@test.com',
        password: '12345',
      });
      token = response.body.token
    })
    it('Creates an account returning 201', async function() {
        const response = await request.post('/signup')
        .send(testUser);

        expect(response.statusCode).toBe(201);
    });
      
      it('Get All users returning 200', async function() {
            const response = await supertest(app)
              .get('/users/allUsers')
              .set('Authorization',`Bearer ${token}`)
            expect(response.statusCode).toBe(200);
      }); 
      it('Get user info returning 200', async function() {
          const response = await supertest(app)
            .get(`/users/userInfo/${1}`)
            .set('Authorization',`Bearer ${token}`)
            expect(response.statusCode).toBe(200);
      }); 
      it('Unauthorized user access to get user info returning 401', async function() {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiQWxhYSIsImxhc3RuYW1lIjoiQWxoYXptaSIsIQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWjRLeW1kRm9KcEh2Q3lWaWRma2U2dVRVTnkuSE1DSW0yN0FjR2hkcm1IaGx4M1ZXeHB0MFc"
        const response = await supertest(app)
          .get(`/users/userInfo/${1}`)
          .set('Authorization',`Bearer ${token}`)
          expect(response.statusCode).toBe(401);
    }); 
      it('Update user information returning 200', async function() {
        const response = await supertest(app)
          .put(`/users/update/${1}`)
          .set('Authorization',`Bearer ${token}`)
          .send({
            colName: 'firstname',
            value: 'Araw',
          });
        expect(response.statusCode).toBe(200);
      }); 
      it('Delete user account returning 200', async function() {
        const response = await supertest(app)
          .delete(`/users/delete/${1}`)
          .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
      }); 

  });