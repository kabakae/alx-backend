import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create the Express app
const app = express();
const port = 1245;

// Set up Redis client and promisify the get function
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

// Sample list of products
const listProducts = [
  { id: 1, name: "Suitcase 250", price: 50, stock: 4 },
  { id: 2, name: "Suitcase 450", price: 100, stock: 10 },
  { id: 3, name: "Suitcase 650", price: 350, stock: 2 },
  { id: 4, name: "Suitcase 1050", price: 550, stock: 5 }
];

// Middleware to parse JSON in request body
app.use(express.json());

// Function to get an item by ID
function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

// Route to list all products
app.get('/list_products', (req, res) => {
  const productList = listProducts.map(product => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock
  }));
  res.json(productList);
});

// Function to reserve stock by ID
async function reserveStockById(itemId, stock) {
  await client.set(`item.${itemId}`, stock);  // Set reserved stock for the product
}

// Function to get current reserved stock by ID
async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock, 10) : 0;
}

// Route to get product details by ID, including current reserved stock
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const availableStock = product.stock - reservedStock;
  res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity: availableStock
  });
});

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  if (reservedStock >= product.stock) {
    return res.json({
      status: 'Not enough stock available',
      itemId: product.id
    });
  }

  await reserveStockById(itemId, reservedStock + 1);  // Reserve one unit
  res.json({
    status: 'Reservation confirmed',
    itemId: product.id
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

