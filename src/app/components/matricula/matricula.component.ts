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

  private cedulaValidators = [
         Validators.maxLength(10),
         Validators.minLength(9),
         Validators.pattern(/^[0-9]*$/)
  ];

  datosEstudiante = this._formBuilder.group({
    identificacionEstudiante: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(9),Validators.pattern(/^[0-9]*$/)]) ],
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
      activo: true,
      qrImage:"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",
      qrUrl:"www.link.com"
    };
    this.progSelected = [];
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

  cambiarValidadores(data:any):void {
    console.log("Cambio de valor detectado");
    console.log(this.matricula.estudiante.persona);
    console.log(data.value);
   if(data.value == TipoIdentificacion.CEDULA) {
     console.log('Valida como cedula');
      this.datosEstudiante.get('identificacionEstudiante')!.setValidators(this.cedulaValidators);
    } else {
      this.datosEstudiante.get('identificacionEstudiante')!.setValidators(Validators.required);
      console.log('Valida solo ingreso');
    }

  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.matricula);
    console.warn('Estudiante: '+this.matricula.estudiante.persona.nombre);
    this.progSelected = [];

    for (let val of this.dispositivos ) {
      val.checked=false;
    }
    for (let val of this.internet ) {
      val.checked=false;
    }


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
      { id: 2, descripcion: "Deficiencia auditiva ( tiene problemas con la audición)", checked: false },
      { id: 3, descripcion: "Déficit atencional", checked: false },
      { id: 4, descripcion: "Trastorno del espectro autista", checked: false },
      { id: 5, descripcion: "Hiperactividad", checked: false },
      { id: 6, descripcion: "Problemas motores", checked: false },
      { id: 7, descripcion: "Problemas de lenguaje o de articulación", checked: false },
      { id: 8, descripcion: "Dislexia", checked: false },
      { id: 9, descripcion: "No presenta ninguna necesidad educativa", checked: false },
      { id: 10, descripcion: "Otra", checked: false }
    ];
    return mats;
  }

  private getDispositivos(): Opcion[] {
    let mats = [
      { id: 1, descripcion: "computadora", checked: false },
      { id: 1, descripcion: "tablet", checked: false },
      { id: 2, descripcion: "celular", checked: false },
      { id: 3, descripcion: "No tiene", checked: false }
    ];
    return mats;
  }

  private getInternet(): Opcion[] {
    let mats = [
      { id: 1, descripcion: "internet por cable ( ej. Cable Tica, Telecable o Liberty)", checked: false },     
      { id: 2, descripcion: "internet por plan", checked: false },
      { id: 3, descripcion: "internet por recarga telefónica", checked: false },
      { id: 4, descripcion: "no cuento con internet", checked: false }
    ];
    return mats;
  }

}
