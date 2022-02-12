const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.sendFile('./index.html', { root: path.join(__dirname) });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
