import express from 'express';
import fs from 'fs';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

const app = express();
const port = 3000;
// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
};

// Endpoint para buscar productos filtrados por título
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Buscar productos filtrados por título
 *     description: Devuelve una lista de productos que coinciden con la consulta de búsqueda proporcionada en el parámetro "q".
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Consulta para filtrar productos por título.
 *     responses:
 *       200:
 *         description: Lista de productos filtrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error si no se proporciona ninguna consulta.
 */
app.get('/items', (req, res, next) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'No se proporcionó ninguna consulta' });
    }

    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            return next(err);
        }

        const products = JSON.parse(data);
        // Filtrar productos por la consulta
        const filteredProducts = products.products.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        res.json(filteredProducts);
    });
});

// Endpoint para obtener detalles de un producto por su ID
/**
 * @swagger
 * /item/{id}:
 *   get:
 *     summary: Obtener detalles de un producto por su ID
 *     description: Devuelve los detalles de un producto específico identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a obtener.
 *     responses:
 *       200:
 *         description: Detalles del producto solicitado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Error si el producto no se encuentra.
 */
app.get('/item/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            return next(err);
        }

        const products = JSON.parse(data);
        // Buscar producto por ID
        const product = products.products.find(product => product.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    });
});

// Habilitar CORS
app.use(cors());

// Middleware para manejar errores
app.use(errorHandler);

// Especificación de Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Productos',
            version: '1.0.0',
            description: 'API para buscar y mostrar productos',
        },
        servers: [
            {
                url: `http://localhost:${port}/api`,
                description: 'Servidor local',
            },
        ],
    },
    apis: ['app.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Iniciar el servidor
import os from 'os';

const server = app.listen(port, () => {
  const serverIp = Object.values(os.networkInterfaces())
    .flat()
    .find((item) => item.family === 'IPv4' && !item.internal);

  console.log(`Servidor escuchando en http://${serverIp.address}:${port}`);
});
