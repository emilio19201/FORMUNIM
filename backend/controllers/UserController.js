//crear usuraio 
//eliminar usuarios 
//actualizar usuraios 
//traer usuraios                  //
//traer un usurio 
//logear usuario 
import { UserModel } from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

export default {
    //async significa que se puede tardar en ejecutar
    createUser: async (req, res) => {        //propiedad que a la vez es un objeto
        try {
            //funciion para guardar usuarios

            const name = req.body.name;
            const password = req.body.password;
            const email = req.body.email;
            //validar si existe
            if (!name || !password || !email) {
                res.status(400).json({
                    "msg": "Parametros Invalidos"
                })
            }
            const user = {
                name,
                password,
                email
            };
            await UserModel.create(user);

            res.status(200).json({
                "msg": "Usuario creado con exito!"
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ "msg": "ocurrio un error al crear el usurio" });
            return;

        }

    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(`ID recibido para eliminacion: ${id}`)//no me elimina asi que se usa los template literals para mandar llamar una variable id y asi dar una verificacion de que exista ese id
            const user = await UserModel.findById(id);
            if (!user) {
                 return res.status(400).json({
                    "msg": "No se encuentro usuario para eliminar"
                });
                
            }
            await UserModel.deleteOne({ _id: id  });
            res.status(200).json({
                "msg": "Usuerio eliminado con exito"
            })
            

        } catch (error) {
            console.log(error);
            res.status(500).json({ "msg": "ocurrio un error al eliminar el usurio" });
            return;

        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            const {name , email , password } = req.body;
            if (!name||!email||!password){
                return res.status(400).json({
                    "msg":"Parametro invalidos"
                });
            } 
            const user = await UserModel.findById(id);
            if (!user){
                return res.status(404).json({
                    "msg":"Usuario no encontrado"
                })
            }
            user.name = name;
            user.email = email;
            user.password = password;
            await user.save();
            res.status(200).json ({
                "msg":"Usuario actualizado con exito"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json ({
                "msg":"Ocurrio un error al actualizar al usuario"
            });
            }
            
        },
        
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json({
                "msg": "Usuario obtenidos con exito",
                users
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "msg": "Ocurrio un error al obtener los usurios"
            });
            return;

        }
    },
    getUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            if (!user) {

               return res.status(400).json({
                    "msg": "No se encontro el Usuario"
                });
                
            }
            res.status(200).json(user);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "msg": "Ocurrio un error al obtener los usurios"

            })
        }
    },
    login: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await UserModel.findOne({ email, password });
            if (!user) {
                res.status(401).json({
                    "msg": "Crendenciales invalidas"
                })
                return;
            }
            const token = jwt.sing(JSON.stringify(user), "shhhh");
            res.status(200).json({
                "msg": "Logueado con exito", token
            })
            return;


        } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg":"Ocurrio un error al iniciar sesion"
        });
        }
    }
}


