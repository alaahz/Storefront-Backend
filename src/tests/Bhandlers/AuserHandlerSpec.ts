import app from '../../server'
import supertest from 'supertest';



const request =  supertest(app)

describe('Testing User Endpoint: ', function() {

    const testUser = {
        firstname: 'Alaa',
        lastname: 'Alhazmi',
        email: 'alaahz1@test.com',
        password: '12345',

    }
    let userID :number;
    let token ='';
    // beforeAll used to call signup endpoint and return token and  userId to use it in each case 
    beforeAll( async function(){
      const response = await request.post('/signup')
      .send(testUser);
      userID = response.body.userInfo.id
      token = response.body.token  

    })
    it('Creates an account returning 200', async function() {
      const response = await supertest(app)
        .post('/signup')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.com',
          password: '12345',
        });
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
            .get(`/users/userInfo/${userID}`)
            .set('Authorization',`Bearer ${token}`)
            expect(response.statusCode).toBe(200);

      }); 
      it('Unauthorized user access to get user info returning 401', async function() {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiQWxhYSIsImxhc3RuYW1lIjoiQWxoYXptaSIsIQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWjRLeW1kRm9KcEh2Q3lWaWRma2U2dVRVTnkuSE1DSW0yN0FjR2hkcm1IaGx4M1ZXeHB0MFc"
        const response = await supertest(app)
          .get(`/users/userInfo/${userID}`)
          .set('Authorization',`Bearer ${token}`)
          expect(response.statusCode).toBe(401);
    }); 
      it('Update user information returning 200', async function() {

        const response = await supertest(app)
          .put(`/users/update/${userID}`)
          .set('Authorization',`Bearer ${token}`)
          .send({
            colName: 'firstname',
            value: 'Araw',
          });
        expect(response.statusCode).toBe(200);
      }); 


  });