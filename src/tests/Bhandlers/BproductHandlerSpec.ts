import app from '../../server'
import supertest from 'supertest';

const request =  supertest(app)
describe('Testing Product Endpoints: ', function() {
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
      productID = response2.body.productInfo.id


    })
    it('Create new Product returning 201', async function() {
      const response = await supertest(app)
        .post('/products/newProduct')
        .set('Authorization',`Bearer ${token}`)
        .send({
          pname:'IPhone 13',
          price:5000,
          category:'Tech'
        })
      expect(response.statusCode).toBe(201);
}); 


    it('Get product info returning 200', async function() {
    const response = await supertest(app)
    .get(`/products/${productID}`)
    expect(response.statusCode).toBe(200);

    });  



    it('Get category products returning 200', async function() {
        const response = await supertest(app)
          .post('/products/productsCategory')
          .send({
            category:'Book',
          })
        expect(response.statusCode).toBe(200);

      });   


    it('Update product information returning 200', async function() {
        const response = await supertest(app)
          .put(`/products/update/${productID}`)
          .set('Authorization',`Bearer ${token}`)
          .send({
            colName: 'pname',
            value: 'how to test',
          });
        expect(response.statusCode).toBe(200);
      }); 
    it('Delete product returning 200', async function() {
        const response = await supertest(app)
          .delete('/products/delete')
          .send({
            productId:productID
          })
          .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
      }); 

  });