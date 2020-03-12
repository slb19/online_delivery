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

##### General info and description
	The landing page is more than simple...and prompts you to enter to see the menu. I didnt add any auth for the guest users.
For every user who visits the page a row is created at the cart model and this row is connected with the user by a jwt token that has at its payload a random string that was generated 
by the server .The token is stored in local storage of the browser and its being send to the server at every request before the user completes the order. 
When a user clicks add button in one of the menu cards, the cart model is updated . If a user refresh the page the frontend doesnt loose
the items that the user has added to the cart . The cart model is like a temporary table before the final order.
	The final order will be stored at the orders table after you press "create order" button. The items that have been ordered are stored as an array of objects with keys for the specific item and the quantity, in both the cart and orders table
To view the orders you have to navigate to the hiden frontend route /admin and login with the credentials(auth with jwt) that were added previously with postman. The user in this page can view all orders in a simple table and view  
all the infos about a specific order if he clicks an order in the table.

##### Room for improvement and bugs
 1. If i had more time i would redesign part of the app to use only one table for orders and cart .An order would have been marked as final with a boolean column in the same table.
 2. The jwt for connecting the user with the orders and cart models maby was too much .I could use just the mongoId and store it in the state of the user and pass it as a param..
 3. The app has a major bug with the currency .From euro to any other currency the convertion works well but if you switch back to euro it gives falsy results. Falsy results for the price are also returned if you refresh the page and you have already changed currency.
 4. Project is not finished there are more functionalities that i didnt create and some errors to be fixed..
 5. UI has very basic styling and design... 
...........................................................................

I believe that i spent on the assignment approximately 20 hours from Saturday to wednesday 

Thanks for the challenge .I enjoyed it a lot!
I will be waiting for your feedback .
	
	








