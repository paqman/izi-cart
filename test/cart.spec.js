const request = require('supertest')('http://localhost:3000')

describe('Product', () => {
  test('Get all products', () => request
    .get('/product')
    .expect(200)
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
})
