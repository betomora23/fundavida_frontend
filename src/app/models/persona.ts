import { TipoIdentificacion } from "../enums/TipoIdentificacion";
import { Genero } from "../enums/Genero";



export interface Persona {
        nombre: string;

        apellido1: string;

        apellido2: string;

        email: string;

        identificacion: string;

        tipoIdentificacion: TipoIdentificacion;

        notas: string;

        telefono: string;

        genero: Genero;

        fechaNacimiento: Date;

        nacionalidad: string;

        direccion: string;
}
