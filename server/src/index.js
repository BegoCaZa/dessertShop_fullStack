const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/users.routes');

require('dotenv').config(); //permite leer el archivo .env
const PORT = process.env.PORT; //las variables de entorno siempre va en MAYUSCULAS

const corsOptions = {
  origin: '*', // Orígenes permitidos (cuando esté en un dominio real, lo cambiaremos por ese dominio)
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', usersRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});
