import { Estudiante } from "./estudiante";
import { Periodo } from "./periodo";
import { CentroEducativo } from "./centroEducativo";
import { Sede } from "./sede";
import { MatriculaPrograma } from "./matriculaPrograma"
import { Materia } from "./materia";
import { NecesidadEducativa } from "./necesidadEducativa";

export interface Matricula {
  id: number;

  estudiante: Estudiante;

  periodo: Periodo;

  sede: Sede;

  gradoCursa: string;

  notasIngreso: string;

  convocatoria: boolean;

  anhoIngreso: string;

  centroEducativo: CentroEducativo;

  matriculaPrograma: MatriculaPrograma[];

  materiasConvocatoria: Materia[];

  necesidadesEducativas: NecesidadEducativa[];



}
