require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// This is our Gatekeeper. It receives a request for a domain, 
// and sends back the info linked to that domain.
app.post('/resolve', async (req, res) => {
    const { domain } = req.body;
    
    console.log(`Checking Axiom Gateway for: ${domain}`);

    // For now, we simulate the "lookup" process. 
    // Later, this is where we plug in the Blockchain connection.
    const mockDatabase = {
        "producer.axiom": "0x123abc...owner_address",
        "beatmaker.axiom": "0x789xyz...owner_address"
    };

    const owner = mockDatabase[domain] || "Domain not found";

    res.json({
        domain: domain,
        status: "success",
        resolvedAddress: owner,
        message: "Axiom Gateway successfully queried."
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Axiom Gateway live on port ${PORT}`));
