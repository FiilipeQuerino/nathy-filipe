const axios = require('axios');

module.exports = async (req, res) => {
    const { amount, cardHash } = req.body;

    try {
        const response = await axios.post('https://api.stone.com.br/v1/transactions', {
            amount,
            card_hash: cardHash,
            client_id: process.env.STONE_CLIENT_ID,
            client_secret: process.env.STONE_CLIENT_SECRET
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Erro ao iniciar transação:', error);
        res.status(500).send('Erro ao iniciar transação');
    }
};