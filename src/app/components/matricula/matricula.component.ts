import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatGridListModule } from '@angular/material/grid-list';
import { Genero, Genero2LabelMapping } from '../../enums/Genero';
import { TipoIdentificacion, TipoIdentificacion2LabelMapping } from '../../enums/TipoIdentificacion'; 
import { Matricula } from '../../models/matricula';
import { Materia } from '../../models/materia'
import { Periodo } from '../../models/periodo';
import { Sede } from '../../models/sede';
import { CentroEducativo } from '../../models/centroEducativo';
import { MatriculaService } from '../../services/matricula.service';
import { Estudiante } from '../../models/estudiante';
import { MatListOption } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { Programa } from '../../models/programa';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NecesidadEducativa } from '../../models/necesidadEducativa';
import { Opcion } from '../../models/opcion';

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
  public programas: Programa[];
  public progSelected: Programa[];
  public materias: Materia[];
  public necesidades: NecesidadEducativa[];
  public dispositivos: Opcion[];
  public internet: Opcion[];
  public paises: string[];
  public periodo: Periodo;
  public rangeAnhos: string[];

  datosEstudiante = this._formBuilder.group({
    identificacionEstudiante: ['', Validators.required],
    selectTipoId: ['', Validators.required],
    nombreEstudiante: ['', Validators.required],
    apellido2Estudiante: ['', Validators.required],
    apellido1Estudiante: ['', Validators.required],
    selectGenero: ['', Validators.required],
    emailEstudiante: ['', Validators.required],
    selectorLateralidad: ['', Validators.required],
    fechaNacimientoEstudiante: ['', Validators.required],
    telefonoEstudiante: ['', Validators.required],
    selectPaisEstudiante: ['', Validators.required],
    direccionEstudiante: ['', Validators.required],
    selectorSedes: ['', Validators.required],
  });
  datosEncargado = this._formBuilder.group({
    identificacionEncargado: ['', Validators.required],
    selectTipoIdEncargado: ['', Validators.required],
    nombreEncargado: ['', Validators.required],
    apellido2Encargado: ['', Validators.required],
    apellido1Encargado: ['', Validators.required],
    selectGenero: ['', Validators.required],
    emailEncargado: ['', Validators.required],
    fechaNacimientoEncargado: ['', Validators.required],
    telefonoEncargado: ['', Validators.required],
    telefonoEncargado2: ['', Validators.required],
    selectPaisEncargado: ['', Validators.required],
    direccionEncargado: ['', Validators.required],
  });
  infoAcademica = this._formBuilder.group({
    selectorGrado: ['', Validators.required],
    infoAcademicaCentro: ['', Validators.required],
    convocatoria: ['', Validators.required],
  });
  permanencia = this._formBuilder.group({
    selectorAnhos: ['', Validators.required],
    motivoIngreso: ['', Validators.required],
  });
  isEditable = false;
  centroNombre = "";


  constructor(private modalService: NgbModal, private _formBuilder: FormBuilder) {
    this.periodo = {
      id: 1,
      descripcion: "2024",
      anho: 2024,
      activo: true
    };
    this.sedes = [{ id:1, descripcion:"Sede 1" }, { id:2, descripcion:"Sede 2" }];
    this.centros = [{ id:1, descripcion:"Centro 1" }, { id:2, descripcion:"Centro 2" }];
    this.matricula = this.newMatricula();
    this.materias = this.getMaterias();
    this.necesidades = this.getNecesidades();
    this.dispositivos = this.getDispositivos();
    this.internet = this.getInternet();    
    this.paises = ["Costa Rica", "Nicaragua", "Venezuela", "El Salvador", "Honduras", "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia",
      "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bahrein", "Bangladesh", "Barbados", "Belarús", "Bélgica", "Belice", "Benin", "Bhután", "Bolivia", "Bosnia y Herzegovina", "Botswana", "Brasil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Chad", "Chequia",
      "Chile", "China", "Chipre", "Colombia", "Comoras", "Congo", "Côte d'Ivoire", "Croacia", "Cuba", "Dinamarca", "Djibouti", "Dominica", "Ecuador", "Egipto", "Emiratos Árabes Unidos", "Eritrea","Eslovaquia","Eslovenia","España","Estado de Palestina","Estados Unidos","Estonia","Etiopía","ex República Yugoslava de Macedonia","Rusia","Fiji","Filipinas","Finlandia",
      "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea Ecuatorial", "Guinea-Bissau", "Guyana", "Haití", "Hungría","India","Indonesia","Irán","Iraq","Irlanda","Islandia","Islas Cook","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajstán",
      "Kenya", "Kirguistán", "Kiribati", "República Árabe Siria", "Kuwait", "República de Moldova", "República de Corea", "Lesotho", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein",
      "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malawi", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Mónaco", "Mongolia", "Montenegro",
      "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Níger", "Nigeria", "Niue", "Noruega", "Nueva Zelandia", "Omán", "Países Bajos", "Pakistán", "Palau", "Panamá", "Papua Nueva Guinea",
      "Paraguay", "Perú", "Polonia", "Portugal", "Qatar", "Reino Unido", "República Árabe Siria", "República Centroafricana", "República de Corea", "República Democrática del Congo",
      "República Democrática Popular Lao", "República Dominicana", "República Popular Democrática de Corea", "República Unida de Tanzanía", "Rumania", "Rwanda", "Saint Kitts y Nevis",
      "Samoa", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santa Sede", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Serbia y Montenegro", "Seychelles", "Sierra Leona",
      "Singapur", "Somalia", "Sri Lanka", "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Suriname", "Swazilandia", "Tailandia", "Tayikistán", "Timor-Leste", "Togo", "Tonga",
      "Trinidad y Tabago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Viet Nam", "Yemen", "Zambia", "Zimbabwe"];    
    this.rangeAnhos = this.createRange();
    this.progSelected = [];
      this.programas = [
      {
        id: 1,
        title: 'Apoyo Educativo',
        checked: false,
      },
      {
        id: 2,
        title: 'Centros Interactivos',
        checked: false,
      },
      {
        id: 3,
        title: 'Inglés',
        checked: false,
      },
      {
        id: 4,
        title: 'Jóvenes con propósito',
        checked: false,
      },
      {
        id: 4,
        title: 'Psicología',
        checked: false,
      },
    ];
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {

  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.matricula);
    console.warn('Estudiante: '+this.matricula.estudiante.persona.nombre);

    this.matricula = this.newMatricula();
    window.scroll(0, 0);
  }
  
  private createRange() {
    // return new Array(number);
    let anhoInicio = this.periodo.anho-1;
    return new Array(15).fill("")
      .map((n, index) => "" + (anhoInicio - index));
  }
  


  private newMatricula(): Matricula {
    let newMatricula = {
      id: -1,
      estudiante: this.getEstudiante(),
      periodo: this.periodo,
      sede: { id: -1, descripcion: "" },
      centroEducativo: this.centros[0],
      matriculaPrograma: [],
      convocatoria: false,
      gradoCursa:"Primer Grado",
      materiasConvocatoria: [],
      necesidadesEducativas: [],
      notasIngreso: "",
      anhoIngreso: "" + (this.periodo.anho-1)
    };
    return newMatricula;
  }

  private getEstudiante(): Estudiante {
    let est = {
      id: -1,
      persona: {
        nombre: "",
        apellido1: "",
        apellido2: "",
        email: "",
        identificacion: "",
        tipoIdentificacion: TipoIdentificacion.CEDULA,
        notas: "",
        telefono: "",
        telefono2: "",
        lateralidad: "Derecha",
        genero: Genero.MASC,
        fechaNacimiento: new Date(),
        nacionalidad: "Costa Rica",
        direccion: ""
      },
      encargado: {
        nombre: "",
        apellido1: "",
        apellido2: "",
        email: "",
        identificacion: "",
        lateralidad:"",
        tipoIdentificacion: TipoIdentificacion.CEDULA,
        notas: "",
        telefono: "",
        telefono2: "",
        genero: Genero.MASC,
        fechaNacimiento: new Date(),
        nacionalidad: "",
        direccion: ""
      }
    }
    return est;
  }
  private getMaterias():Materia[] {
    let mats = [
      { id: 1, descripcion:"matématica",checked:false},
      { id: 1, descripcion: "español", checked: false },
      { id: 2, descripcion: "estudios sociales", checked: false },
      { id: 3, descripcion: "ciencias", checked: false },
      { id: 4, descripcion: "biología", checked: false },
      { id: 5, descripcion: "química", checked: false },
      { id: 6, descripcion: "cívica", checked: false },
      { id: 7, descripcion: "inglés", checked: false },
      { id: 8, descripcion: "francés", checked: false },
      { id: 9, descripcion: "Otra", checked: false }
    ];
    return mats;
  }

  private getNecesidades(): NecesidadEducativa[] {
    let mats = [
      { id: 1, descripcion: "Deficiencia visual ( usa lentes)", checked: false },
      { id: 1, descripcion: "Deficiencia visual ( usa lentes)", checked: false },
      { id: 2, descripcion: "Déficit atencional", checked: false },
      { id: 3, descripcion: "Trastorno del espectro autista", checked: false },
      { id: 4, descripcion: "Hiperactividad", checked: false },
      { id: 5, descripcion: "Problemas motores", checked: false },
      { id: 6, descripcion: "Problemas motores", checked: false },
      { id: 7, descripcion: "Problemas motores", checked: false },
      { id: 8, descripcion: "Problemas motores", checked: false }
    ];
    return mats;
  }

  private getDispositivos(): Opcion[] {
    let mats = [
      { id: 1, descripcion: "computadora", checked: false },
      { id: 1, descripcion: "tablet", checked: false },
      { id: 2, descripcion: "celular", checked: false },
      { id: 3, descripcion: "celular", checked: false }
    ];
    return mats;
  }

  private getInternet(): Opcion[] {
    let mats = [
      { id: 1, descripcion: "internet por cable ( ej. Cable Tica, Telecable o Liberty)", checked: false },
      { id: 1, descripcion: "internet por plan", checked: false },
      { id: 2, descripcion: "internet por plan", checked: false },
      { id: 3, descripcion: "internet por recarga telefónica", checked: false },
      { id: 4, descripcion: "no cuento con internet", checked: false }
    ];
    return mats;
  }

}
