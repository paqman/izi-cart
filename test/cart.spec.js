const request = require('supertest')('http://localhost:3000')

let cookies

/**
 * Helper method to send a [POST]/cart/:id request
 * @param id The ID of the product
 * @param cookie The cookie header
 */
const addProduct = (id, cookie) => request
  .post(`/cart/${id}`)
  .set('cookie', cookie)

/**
 * Helper method to send a [DELETE]/cart/:id request
 * @param id The ID of the product
 * @param cookie The cookie header
 */
const removeProduct = (id, cookie) => request
  .delete(`/cart/${id}`)
  .set('cookie', cookie)

describe('Product', () => {
  test('Get all products', () => request
    .get('/product')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(({ body }) => {
      expect(body).toHaveLength(5)
    }))
})

describe('Cart', () => {
  test('Get current cart', () => request
    .get('/cart')
    .expect(200)
    .expect(({ body }) => {
      expect(body).toHaveLength(0)
    }))

  describe('Handle adding a single item', () => {
    test('Add item to cart', () => request
      .post('/cart/1')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveLength(1)
      }))

    test('Add wrong item to cart', () => request
      .post('/cart/0')
      .expect(404))

    test('Add inexistant item to cart', () => request
      .post('/cart/item')
      .expect(404))
  })

  describe('Handle removing a single item', () => {
    test('Remove item from cart', () => request
      .delete('/cart/1')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveLength(0)
      }))

    test('Remove wrong item from cart', () => request
      .post('/cart/0')
      .expect(404))

    test('Remove wrong item from cart', () => request
      .post('/cart/item')
      .expect(404))
  })

  describe('Handling multiple item', () => {
    test('Add items to cart', () => addProduct(2, null)
      .expect(200)
      .expect(({ headers }) => {
        cookies = headers['set-cookie']
      })
      .then(() => addProduct(3, cookies)
        .expect(200))
      .then(() => request
        .get('/cart')
        .set('cookie', cookies)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveLength(2)
        }))
      .then(() => addProduct(3, cookies)
        .expect(({ body }) => {
          expect(body).toHaveLength(2)
        }))
      .then(() => addProduct(3, cookies)
        .expect(200)
        .expect(({ body }) => body
          .map(product => expect(product.total).toEqual(product.quantity * product.price)))))

    test('Add and remove items from cart', () => addProduct(1, null)
      .expect(200)
      .expect(({ headers }) => {
        cookies = headers['set-cookie']
      })
      .then(() => addProduct(4, cookies)
        .expect(200))
      .then(() => request
        .get('/cart')
        .set('cookie', cookies)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveLength(2)
        }))
      .then(() => addProduct(4, cookies)
        .expect(({ body }) => {
          expect(body).toHaveLength(2)
        }))
      .then(() => addProduct(4, cookies)
        .expect(200))
      .then(() => removeProduct(4, cookies)
        .expect(200)
        .expect(({ body }) => body
          .map(product => expect(product.total).toEqual(product.quantity * product.price))))
      .then(() => removeProduct(4, cookies)
        .set('cookie', cookies)
        .expect(200))
      .then(() => removeProduct(4, cookies)
        .expect(200))
      .then(() => request
        .get('/cart')
        .set('cookie', cookies)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveLength(1)
        }))
      .then(() => removeProduct(1, cookies)
        .expect(200))
      .then(() => request
        .get('/cart')
        .set('cookie', cookies)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveLength(0)
        })))
  })
})
