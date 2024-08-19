import Credential from "../entities/Credential";
import ICreateCredentialDto from "../interfaces/ICreateCredentialsDto";
import IValidateCredentialDto from "../interfaces/IValidateCredentiaslDto";
import { credentialModel } from "../repositories";


export const createCredetial = async (createCredetialDto: ICreateCredentialDto):Promise<Credential> => {
    // * Crear Credencial
    const newCredential: Credential = credentialModel.create(createCredetialDto) 
    //* Crear en BD
    await credentialModel.save(newCredential)
    return newCredential;
}

export const validateCredential = async (validateCredentialDto: IValidateCredentialDto): Promise<Credential> => {
    const { username, password } = validateCredentialDto;
    const foundCredential: Credential | null = await credentialModel.findOneBy({
        // username: username
        username
    });
    if (!foundCredential) throw Error("Wrong credentials");
    if (password !== foundCredential?.password) throw Error("Wrong credentials");
    return foundCredential;
};



// ! Lo que se hizo antes de conectar la bd:

// import ICreateCredentialDto from "../interfaces/ICreateCredentialsDto";
// import ICredential from "../interfaces/ICredential";

// //* Datos Emulados
// const credentials: ICredential[] = [
//     {
//         id: 1,
//         username: "marge",
//         password: "1234"
//     }
// ];
// let credentialId: number = 10;

// export const createCredetial = async (createCredetialDto: ICreateCredentialDto) => {
//     const newCredential: ICredential = {
//         id: credentialId++,
//         username: createCredetialDto.username,
//         password: createCredetialDto.password,
//     }
//     credentials.push(newCredential);
//     return newCredential;
// }

// export const validateCredential = async (validateCredentialDto: ICreateCredentialDto): Promise<ICredential> => {
//     const { username, password } = validateCredentialDto;
//     const foundCredential: ICredential | undefined = credentials.find(
//         credential => credential.username === username
//     );
//     if (!foundCredential) throw Error("User doesn't exist");
//     if (password !== foundCredential?.password) throw Error("Wrong password");
//     return foundCredential;
// };
