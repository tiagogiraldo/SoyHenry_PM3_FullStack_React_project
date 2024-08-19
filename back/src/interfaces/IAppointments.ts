// id: ID numérico que identifica al turno.
// date: fecha para la cual fue reservado el turno.
// time: hora para la cual fue reservado el turno.
// userId: ID del usuario que agendó el turno, referencia al usuario
// status: status actual del turno, que puede ser “active” o “cancelled”.

export enum AppointmetStatus{
    ACTIVE = "active",
    CANCELLED = "cancelled",
}
// !Notar que el objeto anterior no es una interface, y no se separa por ";"

interface IAppointment {
    id: number;
    date:string;
    time: string;
    userId: number;
    status: AppointmetStatus;
    description: string;
}

// description la agregó él, para que muestre de que se trata el turno.

export default IAppointment;