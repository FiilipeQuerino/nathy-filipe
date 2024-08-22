let rsvps = [];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, response } = req.body;
        if (!name || !response) {
            return res.status(400).json({ error: 'Nome e resposta são obrigatórios!' });
        }

        // Salva a resposta na memória
        rsvps.push({ name, response });

        return res.status(200).json({ message: 'Confirmação recebida com sucesso!' });
    } else if (req.method === 'GET') {
        return res.status(200).json(rsvps);
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
