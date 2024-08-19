
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Credential from "./Credential";
import Appointment from "./Appointment";


@Entity({ name: "users" })
class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({type: 'date'})
    birthdate!: string;

    @Column({ unique: true })
    nDni!: string;

    //* User 1:1 Credetial
    @OneToOne(() => Credential)
    @JoinColumn()
    credential!: Credential;

    //* User 1:N Appointment
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments!: Appointment[];
}

export default User;