import app from '../../server'
import supertest from 'supertest';


describe('Testing Product Endpoints: ', function() {

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
    it('Create new Product returning 201', async function() {   
        const response = await supertest(app)
          .post('/products/newProduct')
          .set('Authorization',`Bearer ${token}`)
          .send({
            pname:'Java Progamming',
            price:20,
            category:'Book'
          })
        expect(response.statusCode).toBe(201);
    }); 

    it('Get product info returning 200', async function() {
    const response = await supertest(app)
    .get(`/products/${4}`)
    expect(response.statusCode).toBe(200);
    console.log(response.body);
    });  

    it('Get All Products returning 200', async function() {
        const response = await supertest(app)
        .get('/products/allproducts')
        expect(response.statusCode).toBe(200);
        console.log(response.body);

    }); 

    it('Get category products returning 200', async function() {
        const response = await supertest(app)
          .get('/products/productsCategory')
          .send({
            category:'Book',
          })
        expect(response.statusCode).toBe(200);
        console.log(response.body);

      }); 
    it('Returing 400 beacuse the category is wrong', async function() {
        const response1 = await supertest(app)
          .get('/products/productsCategory')
          .send({
            category:'Music',
          });
        expect(response1.statusCode).toBe(400);
        console.log(response1.body)

      });   
    it('Get the top 5 products', async function() {
            const response = await supertest(app)
            .get('/products/TopProducts')
            expect(response.statusCode).toBe(200);
            console.log(response.body);

      }); 

    it('Update product information returning 200', async function() {
        const response = await supertest(app)
          .put(`/products/update/${3}`)
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
            productId:2
          })
          .set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200);
      }); 

  });