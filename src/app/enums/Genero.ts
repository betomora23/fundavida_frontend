export enum Genero {
  MASC="Masculino",
    FEM="Femenino",
    OTRO="Otro",
}

export const Genero2LabelMapping: Record<Genero, string> = {
  [Genero.MASC]: "Masculino",
  [Genero.FEM]: "Femenino",
  [Genero.OTRO]: "Otro",
};
