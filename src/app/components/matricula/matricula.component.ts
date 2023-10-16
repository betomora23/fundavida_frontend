import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Genero, Genero2LabelMapping } from '../../enums/Genero';
import { TipoIdentificacion, TipoIdentificacion2LabelMapping } from '../../enums/TipoIdentificacion'; 
import { Matricula } from '../../models/matricula';
import { Periodo } from '../../models/periodo';
import { Sede } from '../../models/sede';
import { CentroEducativo } from '../../models/centroEducativo';
import { MatriculaService } from '../../services/matricula.service';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})

export class MatriculaComponent implements OnInit {


  public Genero2LabelMapping = Genero2LabelMapping;
  public generoKeys = Object.values(Genero);

  public TipoIdentificacion2LabelMapping = TipoIdentificacion2LabelMapping;
  public tipoIdentificacionKeys = Object.values(TipoIdentificacion);


  public matricula: Matricula;
  public sedes: Sede[];
  public centros: CentroEducativo[];


  constructor(private modalService: NgbModal) {
    this.sedes = [{ id:1, descripcion:"Sede 1" }, { id:2, descripcion:"Sede 2" }];
    this.centros = [{ id:1, descripcion:"Centro 1" }, { id:2, descripcion:"Centro 2" }];
    this.matricula = {
      id : -1,
      estudiante : this.getEstudiante(),
      periodo : { id : -1, descripcion:"",activo : false},
      sede :  { id : -1, descripcion :"" },
      centroEducativo: this.centros[0],
      matriculaPrograma:[],
      convocatoria:false,
      materiasConvocatoria:[],
      necesidadesEducativas:[]
    };
  }

  private getEstudiante(): Estudiante {
    let est = {
      id:-1,
      persona : {
        nombre:"",
        apellido1:"",
        apellido2:"",
        email:"",
        identificacion:"",
        tipoIdentificacion: TipoIdentificacion.CEDULA,
        notas:"",
        telefono:"",
        genero: Genero.MASC,
        fechaNacimiento: new Date(),
        nacionalidad:"",
        direccion:""
      },
      encargado:  {
        nombre:"",
        apellido1:"",
        apellido2:"",
        email:"",
        identificacion:"",
        tipoIdentificacion: TipoIdentificacion.CEDULA,
        notas:"",
        telefono:"",
        genero: Genero.MASC,
        fechaNacimiento: new Date(),
          nacionalidad: "",
            direccion: ""
  }
    }
    return est;
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {

  }

}
