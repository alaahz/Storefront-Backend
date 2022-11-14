# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index /products/allproducts [Get]
- Show /products/:productId [Get]
- Create /products/newProduct [Post][token required]
- Top 5 most popular products  /products/TopProducts [Get]
- Products by category (args: product category) /products/productsCategory [Get]
- Update /products/update/:productId [token required] (args: column name and value) [Put]
- Delete /products/delete [token required] (args: product ID) [Delete]

#### Users
- Signup or Create /signup (args firstName,lastName, email and password)[Post]
- SignIn /signin (args email and password)[Post]
- Index /users/allUsers [token required] [Get]
- Show  /users/userInfo/:userId [token required] [Get]
- Update /users/update/:userId [token required] (args: column name and value) [Put]
- Delete /users/delete/:userId [token required] [Delete]

#### Orders
- Current Order by user /orders/newOrder/:userId [token required] [Post]
- Completed Orders by user /orders/completed/:userId [token required] [Get]
- Add Product to order /orders/addProduct/:orderId [token required] (args productId and productQuantity) [Post]
- List user orders /orders/allOrders/:userId [token required] [Get]
- List products from current user order /orders/userOrderItems/:userId [token required] [Get]
- Update /orders/update/:orderId [token required] (args: status value Complete or Active ) [Put]
- Delete user's order /orders/delete/:orderId/:userId [token required] [Delete]
- Delete product from order /orders/:orderId [token required] [Delete]


## Data Shapes

The below figure is entity relationship model, is a graphical representation that depicts relationships between tables
![Database](https://i.ibb.co/whwBrNn/storefront-database-erd.png)

#### Product
- id SERIAL PRIMARY KEY
- pname VARCHAR 
- price NUMERIC
- category VARCHAR
- created_at TIMESTAMP

#### User
- id SERIAL PRIMARY KEY
- firstName VARCHAR
- lastName VARCHAR
- email VARCHAR
- password VARCHAR
- created_at TIMESTAMP 

#### Orders
- id SERIAL PRIMARY KEY
- userId integer FOREIGN KEY
- status typest ('Complete', 'Active')
- created_at timestamp 

#### OrderItems
- orderId integer FOREIGN KEY
- productId integer FOREIGN KEY
- productQuantity integer 


