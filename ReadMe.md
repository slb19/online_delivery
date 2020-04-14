### Online Delivery v 1.0.0

##### Prerequisites
This project was build with Node v12.13.1 , React 16.13.0 , Mongodb 3.6.3

##### Instalation guide
To run the project you've got to have mongo db installed on your machine
1. Navigate to /onlineDelivery folder and run "npm install"
2. Navigate to /onlineDelivery/client folder and run "npm install"
3. Start Mongodb Database
4. Navigate to /onlineDelivery folder and run "npm run dev" to start the backend server
5. At the /onlineDelivery/data folder there are 2 json files, one for the Foods of the menu and one for the credentials of the merchant to view the hidden page for the orders

With postman or any other similar tool fire a post request at the localhost:5000/foods 
with the content of the foods.json as the given request body .

With postman or any other similar tool fire a post request at the localhost:5000/admin/signUp with the content of the merchantUser.json as the given request body .This will add the username/password for the merchant to login and view the incoming orders

6. Navigate to /onlineDelivery/client and run "npm start" for the React client

##### Database
The db consits of 4 collections/models
1. foods : Items of the menu
2. cart: The temporary cart of every possible creator of an order
3. orders : To store the orders
4. merchantUser : Credentials for the page where the orders are being displayed

There are no refs between the models

##### Backend routes
*GET :/getToken 
*GET:/fetchCart
*POST:/addToCart
*POST:/createOrder
*POST:/changeCurrency/:price
*POST:/admin/login
*GET:/admin/getAllOrders          (needs authentication)
*GET:/admin/getAllOrders/:orderId (needs authentication)

##### Front end routes
*/
*/foods
*/admin
*/merchant (needs authentication)








