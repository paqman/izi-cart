# izi-cart
Let's try to handle a cart in NodeJS. This project expose an API allowing user to add/remove products from his cart.
The cart is stored in session (which is in memory) and not persisted.

## Prerequisites

<!-- What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links. -->
[NodeJS](https://nodejs.org/en/), this application has been developed using version `11.2.0`

## Installing / Getting started

```shell
nvm use
npm install
```

Will get the development dependencies required to run the project.

## Running

```shell
npm start
```

Will run the development server and expose the API on  [http://localhost:3000](http://localhost:3000)

## Testing

```shell
npm test
```

Will run the integration testing. This requires that the API is already up and running on `:8000`.


### Code style/guidelines
I try to stick to the [airbnb/javascript style guide](https://github.com/airbnb/javascript).

```shell
npm run lint
```
Will displays linting errors. 

### Endpoints

`[GET] /product` 

Return the full list of products 

`[GET] /cart`
 
Return the content of the current user's cart
 
`[POST] /cart/:id`
 
Add the product with :id: to the current user's cart

`[DELETE] /cart/:id`
 
Remove the product with :id from the current user's cart 
