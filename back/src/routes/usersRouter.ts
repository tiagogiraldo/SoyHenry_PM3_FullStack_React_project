import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/usersController";

const usersRouter = Router();

//* GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.

usersRouter.get("/", getAllUsers);

//* GET /appointment => Obtener el detalle de un turno específico.

usersRouter.get("/:id", getUserById);

//* POST /appointment/schedule => Agendar un nuevo turno.

usersRouter.post("/register", register);


//* PUT /appointment/cancel => Cambiar el estatus de un turno a “cancelled”.

usersRouter.post("/login", login);

export default usersRouter;