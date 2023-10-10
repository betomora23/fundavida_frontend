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

  centroEducativo: CentroEducativo;

  matriculaPrograma: MatriculaPrograma[];

  convocatoria: boolean;

  materiasConvocatoria: Materia[];

  necesidadesEducativas: NecesidadEducativa[];

}
