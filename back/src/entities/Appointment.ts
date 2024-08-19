import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./Users";

@Entity({ name: "appointments" })
class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'date'})
    date!: Date;

    @Column({ type: 'time' })
    time!: string;

    @Column()
    userId!: number;

    @Column({
        default: "active",
    })
    status!: string;

    @Column()
    description!: string;

    //* Appointment N:1 User
    @ManyToOne(() => User, (user) => user.appointments)
    user!: User;
}

export default Appointment