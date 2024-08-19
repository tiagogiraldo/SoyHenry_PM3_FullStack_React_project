import User from "../entities/Users";
import ICreateUserDto from "../interfaces/ICreateUserDto";
import ICredential from "../interfaces/ICredential";
import { userModel } from "../repositories";
import { createCredetial } from "./credentialService"

export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers: User[] = await userModel.find({
        relations: { appointments: true }
    });
    return allUsers;
};
// relations: ["appointments"] => Es lo mismo que el anterior
export const getUserByIdService = async (id: number): Promise<User> => {
    const user: User | null = await userModel.findOne({
        where: { id },
        relations: ["appointments"]
    });
    if(!user) throw new Error("User not found");
    return user;
};
        // where: {id:id}
        // relations: { appointments: true} => Es lo mismo que el siguiente
    // Para no agregar a la promesa que es null => Promise<User|null>
    // Se puede agregar un condicional que lance un error cuando ocurra
export const createUserService = async (
    createUserDto: ICreateUserDto
) => {
    //* Crear Usuario
    // La siguiente linea no lleva await por que no se conecta con la bd
    // Los datos los trae desde el formulario.
    const newUser: User = userModel.create(createUserDto);
    //*  Crear Credencial
    const newCredential:ICredential = await createCredetial({
        username: createUserDto.username,
        password: createUserDto.password,
    });
    //* Asociacion newUser con newCredential
    newUser.credential = newCredential;
    await userModel.save(newUser);
    //* findOneBy({id}) SIN relation:["credentials"] => Retorno
    //* Es más elegante que el mensaje en el controller
    return newUser
};
// ! minuto 1:08:50
// * Servicio que retorna el usuario a partir del "username"

export const findUserByCredentialId = async (
    credentialId: number
) => {
    const user: User | null = await userModel.findOneBy({
        credential: { id: credentialId}
        // No usa el where por que esta usando el findByOne
    });
    if(!user) throw new Error("User not found");    
    return user
}


//! Cuando no se ha conectado con la base de datos
// import ICreateUserDto from "../interfaces/ICreateUserDto";
// import ICredential from "../interfaces/ICredential";
// import IUser from "../interfaces/IUser";
// import {createCredetial} from "./credentialService"

// //* Base de Datos
// const users: IUser[] = [
//     {
//         id: 1,
//         name: "Marge Simpson",
//         email: "marge@email.com",
//         birthdate: "1990-01-01",
//         nDni: "12345678",
//         credentialsId: 1,
//     },
// ]

// let id: number = 10;

// export const getAllUsersService = async (): Promise<IUser[]> => {
//     const allUsers: IUser[] = users;
//     return allUsers;
// };

// export const getUserByIdService = async(id: number): Promise<IUser> =>{
//     const user: IUser | undefined = users.find((user) => user.id === id);
//         if(!user) throw new Error("User doesn't found");
//         return user;
// };


// export const createUserService = async (
//     createUserDto : ICreateUserDto
// ) => {
//     const newCredential: ICredential = await createCredetial({
//         username:createUserDto.username,
//         password: createUserDto.password,
//     });
//     const newUser: IUser = {
//         id: id++,
//         name: createUserDto.name,
//         email: createUserDto.email,
//         birthdate: createUserDto.birthdate,
//         nDni: createUserDto.nDni,
//         credentialsId: newCredential.id,
//     };
//     users.push(newUser);
//     return newUser;
// }

// // * Servicio que retorna el usuario a partir del "username"

// export const findUserByCredentialId = async (
//     credentialId: number
// ) => {
//     const user: IUser | undefined = users.find(
//         user => user.id === credentialId
//     );
//     return user
// }
