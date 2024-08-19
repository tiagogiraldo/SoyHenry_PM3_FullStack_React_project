import Appointment from "../entities/Appointment";
import User from "../entities/Users";
import IScheduleAppointmentDto from "../interfaces/IScheduleAppointmentDto";
import { appointmentModel, userModel } from "../repositories";

export const getAllApointmentsService = async (): Promise<Appointment[]> => {
    const allAppointments: Appointment[] = await appointmentModel.find();
    return allAppointments
};

export const getAppointmentByIdService = async (appointmentId: number): Promise<Appointment> => {
    const appointment: Appointment | null = await appointmentModel.findOneBy({
        id: appointmentId,
    });
    if (!appointment) throw new Error("Appointment doesn`t found")
    return appointment;
};

export const scheduleAppointsmentService = async (
    scheduleAppointmentDto: IScheduleAppointmentDto): Promise<Appointment> => {
    const newAppointmet: Appointment = appointmentModel.create(scheduleAppointmentDto);
    const user: User | null = await userModel.findOneBy({
        id: scheduleAppointmentDto.userId,
    });
    if (!user) throw Error("User not found");
    newAppointmet.user = user;
    await appointmentModel.save(newAppointmet);
    return newAppointmet
};

export const cancelAppointmentService = async (
    appointmentId: number
): Promise<void> =>{
    const appointment: Appointment | null = await appointmentModel.findOneBy({
            id: appointmentId,
        });
    if(!appointment){
        throw new Error(`Appointment with id ${appointmentId} not found`)
    }
    if (appointment.status === "cancelled"){
        throw new Error(`Appointment with id ${appointmentId} is already cancelled`)
    } 
    appointment.status = "cancelled";
    await appointmentModel.save(appointment);
};

// * ========================================================================
// !Mi código
// import IAppointment, { AppointmetStatus } from "../interfaces/IAppointments";
// import ICreateAppointmentDto from "../interfaces/ICreateAppointment";

// const appointments: IAppointment[] = [
//     {
//         id: 1,
//         date: '2024-06-01',
//         time: '10:00',
//         userId: 1,
//         status: AppointmetStatus.ACTIVE,
//         description: 'Initial consultation'
//     },
//     {
//         id: 2,
//         date: '2024-07-05',
//         time: '14:00',
//         userId: 1,
//         status: AppointmetStatus.CANCELLED,
//         description: 'Follow-up appointment'
//     },
//     {
//         id: 3,
//         date: '2023-24-10',
//         time: '16:00',
//         userId: 1,
//         status: AppointmetStatus.ACTIVE,
//         description: 'Regular check-up'
//     }
// ];

// let id: number = 20;

// export const getAllAppointmentsService = async (): Promise<IAppointment[]> => {
//     const allAppointments: IAppointment[] = appointments;
//     return allAppointments;
// };

// export const getAppointmentByIdService = async (id:number): Promise<IAppointment> => {
//     const appointment: IAppointment | undefined = appointments.find(
//         (appointment) => appointment.id === id);
//         if(!appointment) throw new Error("Appointment doesn`t found")
//         return appointment;
// }


// export const createScheduleService = async (
//     userId: number,
//     createAppointmentDto: ICreateAppointmentDto
//   ) => {
//     const newAppointment: IAppointment = {
//       id: id++,
//       date: createAppointmentDto.date,
//       time: createAppointmentDto.time,
//       userId: userId,
//       status: createAppointmentDto.status,
//       description: createAppointmentDto.description
//     };
//     appointments.push(newAppointment);
//     return newAppointment;
//   };

//   // Implementar una función que reciba el id de un turno específico y 
//   // una vez identificado el turno correspondiente, 
//   // cambiar su estado a “cancelled”.

// export const cancelService = async (
//     appointmentId: number
// ) =>{
//     const appointment: IAppointment | undefined = appointments.find(
//         appointment => appointment.id === appointmentId
//     );
//     if(!appointment){
//         throw new Error(`Appointment with id ${appointmentId} not found`)
//     }
//     if (appointment.status === AppointmetStatus.CANCELLED){
//         throw new Error(`Appointment with id ${appointmentId} is already cancelled`)
//     } 
//     if (appointment.status === AppointmetStatus.ACTIVE) {
//         appointment.status = AppointmetStatus.CANCELLED;
//       }
//     return appointment
// }
