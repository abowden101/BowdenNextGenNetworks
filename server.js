const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/audit-request', (req, res) => {
    console.log("New Audit Request from:", req.body.email);
    res.status(200).json({ message: "Security consultant will contact you shortly." });
});

app.listen(PORT, () => console.log(`BowdenNGN Server running on port ${PORT}`));
