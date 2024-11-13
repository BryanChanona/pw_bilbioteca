import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ibook } from '../interfaces/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  // Método para obtener un arreglo de libros
  getBooks(): Observable<Ibook[]> {
    return this.http.get<Ibook[]>(`${this.apiUrl}/getAllBooks`).pipe(
      catchError(this.handleError<Ibook[]>('getBooks', []))
    );
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
