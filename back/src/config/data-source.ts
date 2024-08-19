import { DataSource } from "typeorm";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs";
import User from "../entities/Users";
import Credential from "../entities/Credential";
import Appointment from "../entities/Appointment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // synchronize: true,  //* Se pasan a false cuando se pase a producción
    // dropSchema: true,   //* Se pasan a false cuando se pase a producción 
    logging: true,
    // entities: [User, Credential, Appointment],
    entities: ["src/entities/*.ts"],
    subscribers: [],
    migrations: [],
})