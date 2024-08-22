export default function handler(req, res) {
    const data = {
        message: "Este é um exemplo de JSON sendo servido pela Vercel",
        success: true
    };
    res.status(200).json(data);
}
