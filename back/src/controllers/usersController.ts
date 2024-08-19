import { Request, Response } from "express";
import { createUserService, findUserByCredentialId, getAllUsersService, getUserByIdService } from "../services/userService";
import ICreateUserDto from "../interfaces/ICreateUserDto";
import { validateCredential } from "../services/credentialService";
import User from "../entities/Users";
import IValidateCredentialDto from "../interfaces/IValidateCredentiaslDto";
import Credential from "../entities/Credential";

//* GET /users => Obtener el listado de todos los usuarios.

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getAllUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    };
};

//* GET /users/:id => Obtener el detalle de un usuario específico.

export const getUserById = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const { id } = req.params;
        const user: User = await getUserByIdService(Number(id));
        res.status(200).json(user)
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    };
};

//* POST /users/register => Registro de un nuevo usuario.

export const register = async (req: Request<{}, {}, ICreateUserDto>, res: Response) => {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser: User = await createUserService({
            name, email, birthdate, nDni, username, password,
        });
        // Para evitar que devuelva el password cuando se haga
        // la petición, lo que se hace es retornar un mensaje
        // res.status(201).json({ newUser })
        res.status(201).json({ message:"User created succesfully" })

    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}

//* POST /users/login => Login del usuario a la aplicación.

export const login = async (req: Request<{}, {}, IValidateCredentialDto>, res: Response) => {
    try{
        const { username, password} = req.body;
        const credential: Credential = await validateCredential({
            username, password
        });
        const user: User | null = await findUserByCredentialId(credential.id)
        res.status(200).json({login: true, user})
    } catch(error:any){
        res.status(400).json({message: error.message})
    }
};