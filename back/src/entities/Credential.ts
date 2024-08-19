import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"credentials"})
class Credential {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;


    //* Credential  1:1 User
    //* Se declara en  el MODELO PPAL: User
}

export default Credential