import { Request, Response } from "express";
import Appointment from "../entities/Appointment";
import { getAllApointmentsService, getAppointmentByIdService,scheduleAppointsmentService, cancelAppointmentService } from "../services/appointmentsServices";

//* GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments: Appointment[] = await getAllApointmentsService();
        res.status(200).json({ appointments })
    } catch (error: any) {
        res.status(404).json({message: error.message})
    };
}

// //* GET /appointment => Obtener el detalle de un turno específico.

export const getAppointmentById = async (req: Request<{id:string}, {}, {}>, res: Response) => {
    try{
        const {id} = req.params;
        const appointment: Appointment = await getAppointmentByIdService(Number(id));
        res.status(200).json({appointment})
    }catch(error:any){
        res.status(404).json({ message: error.message })
    }
};

// //* POST /appointment/schedule => Agendar un nuevo turno.


export const schedule = async (req: Request, res: Response) => {
    try {
      const { date, time, userId, description } = req.body;
      const newAppointment: Appointment = await scheduleAppointsmentService(
        { date, time, userId, description }
      );
      res.status(201).json({ newAppointment });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

//* PUT /appointment/cancel => Cambiar el estatus de un turno a “cancelled”.

export const cancel = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try{
        const {id} = req.params;
        await cancelAppointmentService(Number(id));
        res.status(200).json({ message: "Appointment was cancelled"});
    }catch(error:any){
        res.status(404).json({ message: error.message });    
    };
};


// * ========================================================================
// ! Mi código
// import { Request, Response } from "express";
// import IAppointment from "../interfaces/IAppointments";
// import { cancelService, createScheduleService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentsServices";
// import ICreateAppointmentDto from "../interfaces/ICreateAppointment";

// //* GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.

// export const getAllAppointments = async (req: Request, res: Response) => {
//     try {
//         const appointments: IAppointment[] = await getAllAppointmentsService();
//         res.status(200).json({ appointments })
//     } catch (error: any) {
//         res.status(404).json({message: error.message})
//     };
// }

// //* GET /appointment => Obtener el detalle de un turno específico.

// export const getAppointmentById = async (req: Request<{id:string}, {}, {}>, res: Response) => {
//     try{
//         const {id} = req.params;
//         const appointment: IAppointment = await getAppointmentByIdService(Number(id));
//         res.status(200).json({appointment})
//     }catch(error:any){
//         res.status(404).json({ message: error.message })
//     }
// };

// //* POST /appointment/schedule => Agendar un nuevo turno.


// export const schedule = async (req: Request, res: Response) => {
//     try {
//       const { id, date, time, status, description } = req.body;
//       const newAppointment: IAppointment = await createScheduleService(id, { date, time, status, description });
//       res.status(201).json({ newAppointment });
//     } catch (error: any) {
//       res.status(400).json({ message: error.message });
//     }
//   };


// //* PUT /appointment/cancel => Cambiar el estatus de un turno a “cancelled”.

// export const cancel = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
//     try{
//         const { id } = req.params;
//         const appointment: IAppointment = await cancelService(Number(id))
//         res.status(200).json({ appointment })
//     }catch(error:any){
//         res.status(404).json({ message: error.message })    
//     }
    
    
// }
