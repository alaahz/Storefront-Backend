import app from '../../server'
import supertest from 'supertest';


describe('Testing Order Endpoints: ', function() {
        const testUser = {
        email: 'alaahz@test.com',
        password: '12345',
    }
    let token ='';
    
    // beforeAll used to call signin endpoint and generate token to use it in each case 
    beforeAll( async function(){
        const response = await supertest(app).post('/signin')
      .send({
        email: 'alaahz@test.com',
        password: '12345',
      });
      token = response.body.token
    })


     it('Create order returning 201', async function() {
        const response = await supertest(app)
        .post(`/orders/newOrder/${2}`)
        .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(201);
      });
     it('Add produect to order returning 200', async function() {
        const response = await supertest(app)
        .post(`/orders/addProduct/${10}`)
        .set('Authorization',`Bearer ${token}`)
        .send({
            "productId":4,
            "productQuantity":1
        })
        expect(response.statusCode).toBe(200);
      }); 
      it('Get completed order returning 200', async function() {
            const response = await supertest(app)
            .get(`/orders/completed/${2}`)
            .set('Authorization',`Bearer ${token}`)
            expect(response.statusCode).toBe(200);
      }); 
      it('Get order items returning 200', async function() {
        const response = await supertest(app)
        .get(`/orders/userOrderItems/${2}`)
        .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
  }); 
      it('Update order status returning 200', async function() {
        const response = await supertest(app)
          .put(`/orders/update/${4}`)
          .set('Authorization',`Bearer ${token}`)
          .send({
            value: 'Complete',
          });
        expect(response.statusCode).toBe(200);
      }); 
      it('Get all orders returning 200', async function() {
        const response = await supertest(app)
          .get(`/orders/allOrders/${2}`)
          .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
      }); 
      it('Delete order returning 200', async function() {
        const response = await supertest(app)
          .delete(`/orders/delete/${4}/${2}`)
          .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
      }); 
      it('Delete product from order returning 200', async function() {
        const response = await supertest(app)
          .delete(`/orders/${4}`)
          .set('Authorization',`Bearer ${token}`)
          .send({productId:3})
        expect(response.statusCode).toBe(200);
      }); 

  });