const express = require('express');
const fetch = require('node-fetch'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

// Proxy endpoint
app.post('/api/gettabledata.php', async (req, res) => {
  try {
    const response = await fetch('https://backend.jotish.in/backend_dev/gettabledata.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    // Optional: shuffle array to show different employees
    if (data?.TABLE_DATA?.data) {
      data.TABLE_DATA.data = data.TABLE_DATA.data.sort(() => Math.random() - 0.5);
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from remote API' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
