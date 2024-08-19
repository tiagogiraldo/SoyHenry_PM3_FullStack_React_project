import { AppointmetStatus } from "./IAppointments";

interface ICreateAppointmentDto {
    date:string;
    time: string;
    status: AppointmetStatus;
    description: string;
}

export default ICreateAppointmentDto;