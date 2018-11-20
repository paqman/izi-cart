// A fake products store. Should use a db or similar
const PRODUCTS = [
  { id: 1, name: 'Sledgehammer', price: 125.75 },
  { id: 2, name: 'Axe', price: 190.50 },
  { id: 3, name: 'Bandsaw', price: 562.13 },
  { id: 4, name: 'Chisel', price: 12.9 },
  { id: 5, name: 'Hacksaw', price: 18.45 }
]

/**
 * Return a list of every products
 */
const getProducts = () => PRODUCTS

module.exports = {
  getProducts
}
