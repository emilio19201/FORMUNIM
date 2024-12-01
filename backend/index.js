import express from 'express';
import mongoose from 'mongoose';
import { CuestionarioModel } from './models/CuestionarioModel.js';
import { UserModel } from './models/UserModel.js'; 
import cors from "cors";
import UserController from "./controllers/UserController.js"

mongoose.connect('mongodb://localhost:27017/Respuestas')
.then(() => {
    console.log('Conexión exitosa a la base de datos');
}).catch(err => console.log("Error en la conexión: ", err));

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hola desde mi servidor');
});


app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crea un nuevo usuario con la contraseña tal como está
        const newUser = new UserModel({
            email,
            password, 
        });

        await newUser.save();
        res.status(201).json({ msg: 'Usuario registrado con éxito' });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Error al registrar el usuario' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca el usuario por email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        // Verifica que la contraseña coincida
        if (user.password !== password) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

      
        return res.status(200).json({ msg: 'Login exitoso' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
});


app.post('/cuestionario', (req, res) => {
    const respuestas = req.body;

    

    CuestionarioModel.create(respuestas)
        .then(() => res.status(200).json({ msg: "Respuestas almacenadas con éxito" }))
        .catch(error => res.status(500).json({ msg: "Error al almacenar las respuestas", error }));
});

app.get('/cuestionario', (req, res) => {
    CuestionarioModel.find()
        .then(respuestas => res.status(200).json(respuestas))
        .catch(error => res.status(500).json({ msg: "Error al obtener las respuestas", error }));
});


app.post("/user/create",UserController.createUser);
app.delete("user/delete", UserController.eleteUser);
app.put("/user/update/:id", UserController.pdateUser);
app.get("/users" ,UserController.getAllUsers);
app.get("/user/:id",UserController.getUser);
app.post("/login",UserController.login);


app.listen(4000, () => {
    console.log('Servidor en línea en el puerto 4000');
});
