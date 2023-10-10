import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../../app/models/matricula';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class MatriculaService {
  private apiSererUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.apiSererUrl}/matricula`);
  }

  public addMatricula(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(`${this.apiSererUrl}/matricula`, matricula);
  }

  public updateMatricula(matricula: Matricula): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.apiSererUrl}/matricula`, matricula);
  }

  public deleteMatricula(matriculaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiSererUrl}/matricula/${matriculaId}`);
  }

  public getMatricula(): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.apiSererUrl}/matricula`);
  }



}
