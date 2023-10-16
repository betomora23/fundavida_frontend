export enum TipoIdentificacion {
  CEDULA = "Cédula",
    RESIDENCIA ="Cédula de residencia",
    PASAPORTE = "Pasaporte",
}


export const TipoIdentificacion2LabelMapping: Record<TipoIdentificacion, string> = {
  [TipoIdentificacion.CEDULA]: "Cédula",
  [TipoIdentificacion.RESIDENCIA]: "Cédula de residencia",
  [TipoIdentificacion.PASAPORTE]: "Pasaporte",
};
