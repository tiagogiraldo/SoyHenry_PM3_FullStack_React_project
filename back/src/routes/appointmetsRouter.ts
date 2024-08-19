import { Router } from "express";
import { getAllAppointments, getAppointmentById, schedule, cancel } from "../controllers/appointmentsController";

const appointmentsRouter = Router();

//* GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.

appointmentsRouter.get("/", getAllAppointments);

//* GET /appointment => Obtener el detalle de un turno específico.

appointmentsRouter.get("/:id", getAppointmentById);

//* POST /appointment/schedule => Agendar un nuevo turno.

appointmentsRouter.post("/schedule", schedule)

//* PUT /appointment/cancel => Cambiar el estatus de un turno a “cancelled”.

appointmentsRouter.put("/cancel/:id", cancel);

export default appointmentsRouter;