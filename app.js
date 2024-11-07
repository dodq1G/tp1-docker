const express = require('express');
const app = express();
const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: 'redis',
        port: 6379
    }
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.connect().catch(console.error);

app.get('/', async (req, res) => {
  try {
    await client.set('message', 'Hello from Redis!'); 
    const reply = await client.get('message');
    res.send(reply);
  } catch (err) {
    res.status(500).send('Error interacting with Redis');
    console.error('Error:', err);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});