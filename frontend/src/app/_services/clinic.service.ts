import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl = 'http://localhost:8080/api/clinic';

  constructor(private http: HttpClient) {}

  /** Pega uma clínica pelo ID */
  getClinic(id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /** Cria uma clínica */
  createClinic(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  /** Atualiza uma clínica */
  updateClinic(id: number | string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  /** Exclui uma clínica */
  deleteClinic(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /** Lista clínicas paginadas */
  getAllClinics(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  /** Pega todas as regionais para select */
  getRegionals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/regionals`);
  }

  /** Pega todas as especialidades para select */
  getSpecialties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/specialties`);
  }
}
