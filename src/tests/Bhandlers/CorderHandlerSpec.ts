import app from '../../server'
import supertest from 'supertest';

 const request =  supertest(app)
describe('Testing Order Endpoints: ', function() {
    const testUser = {
                firstname: 'Alaa',
                lastname: 'Alhazmi',
                email: 'alaahz@test.com',
                password: '12345',
        
            }
            const testProduct={
              pname:'Java Progamming',
              price:20,
              category:'Book'
            }
            let productID :number;
            let orderID:number;
            let userID :number;
            let token ='';
            //beforeAll used to call signup endpoint and return token and  userId to use it in each case 
            beforeAll( async function(){
              const response1 = await request.post('/signup')
              .send(testUser);
              userID = response1.body.userInfo.id
              token = response1.body.token  

              const response2 = await request.post('/products/newProduct')
              .set('Authorization',`Bearer ${token}`)
              .send(testProduct);
              productID= response2.body.productInfo.id
              const response3 = await request.post(`/orders/newOrder/${userID}`)
              .set('Authorization',`Bearer ${token}`)
              orderID = response3.body.orderInfo.id

            })

     it('Create order returning 201', async function() {
        const response = await supertest(app)
        .post(`/orders/newOrder/${userID}`)
        .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(201);
      });
     it('Add produect to order returning 200', async function() {
        const response = await supertest(app)
        .post(`/orders/addProduct/${orderID}`)
        .set('Authorization',`Bearer ${token}`)
        .send({
            "productId":productID,
            "productQuantity":1
        })
        expect(response.statusCode).toBe(200);
      }); 
      it('Get completed order returning 200', async function() {
            const response = await supertest(app)
            .get(`/orders/completed/${userID}`)
            .set('Authorization',`Bearer ${token}`)
            expect(response.statusCode).toBe(200);
      }); 
      it('Get order items returning 200', async function() {
        const response = await supertest(app)
        .get(`/orders/userOrderItems/${userID}`)
        .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
  }); 
      it('Update order status returning 200', async function() {
        const response = await supertest(app)
          .put(`/orders/update/${orderID}`)
          .set('Authorization',`Bearer ${token}`)

        expect(response.statusCode).toBe(200);
      }); 
      it('Get all orders returning 200', async function() {
        const response = await supertest(app)
          .get(`/orders/allOrders/${userID}`)
          .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
      }); 
      it('Delete order returning 200', async function() {
        const response = await supertest(app)
        .delete(`/orders/delete/${orderID}/${userID}`)
        .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
      }); 
      it('Delete product from order returning 200', async function() {
        const response = await supertest(app)
          .delete(`/orders/${userID}`)
          .set('Authorization',`Bearer ${token}`)
          .send({productId:productID})
        expect(response.statusCode).toBe(200);
      }); 

  });