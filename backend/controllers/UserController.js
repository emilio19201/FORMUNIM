//crear usuraio 
//eliminar usuarios 
//actualizar usuraios 
//traer usuraios                  //
//traer un usurio 
//logear usuario 
import { UserModel } from "../models/UserModel.js";

export default {
    //async significa que se puede tardar en ejecutar
    createUser: async (req, res) => {        //prpiedad que a la vez es un objeto
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
            const id = req.URLSearchParams.id;
            const user = await UserModel.findById(id);
            if (!user) {
                res.status(400).json({
                    "msg": "No se encuentro usuario para eliminar"
                })
                return;
            }
            await UserModel.deleteOne({
                _id: id
            });
            res.status(200).json({
                "msg": "Usuerio eliminado con exito"
            })
            return;

        } catch (error) {
            console.log(error);
            res.status(500).json({ "msg": "ocurrio un error al eliminar el usurio" });
            return;

        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id; //params propiedad de la 
            const user = await UserModel.findById(id);
            if (!user) {
                res.status(400).json({
                    "msg": "No se encontro el usuario para actualizarlo"
                })
                return;
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ "msg": "ocurrio un error al actualizar el usurio" });
            return;

        }
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;
        //validar si existe
        if (!name || !password || !email) {
            res.status(400).json({
                "msg": "Parametros Invalidos"
            })
            return;
        }

        await UserModel.findByIdAndUpdate(id, {
            $set: {
                name,
                password,
                email
            }
        });
        res.status(200).json({
            "msg": "Usuario Actualizado con exito"
        })
        return;
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
                res.status(400).json({
                    "msg": "No se encontro el Usuario"
                })
                return
            }
            res.status(200).json({
                "msg": "Usuario encontrado con exito",
                user

            })
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
                "msg": "Logueado con exito"
            })
            return;


        } catch (error) {
            res.status(500).json({
                "msg": "Ocurrio un error al obtener los usurios"
            });
            return;

        }
    }
}