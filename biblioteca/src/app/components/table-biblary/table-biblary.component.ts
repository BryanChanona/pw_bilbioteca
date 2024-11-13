import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { Ibook } from '../../interfaces/book.model';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-table-biblary',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './table-biblary.component.html',
  styleUrls: ['./table-biblary.component.scss']
})
export class TableBiblaryComponent implements OnInit {
  books: Ibook[] = [];
  displayedColumns: string[] = [ 'title', 'description', 'publishedDate', 'actions'];
  dataSource = this.books;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private service: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.service.getBooks().subscribe({
      next: (books) => {
      
        this.books = books;
        this.dataSource = [...this.books];  // Crear una copia para asegurar la actualización en MatTable
      },
      error: (error) => {
        console.error('Error al cargar los libros:', error);
      }
    });
  }

  onEdit(element: Ibook): void {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '400px',
      height:'450px',
      data: {
        title: element.title,
        description: element.description,
        publishedDate: element.publishedDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.title = result.title;
        element.description = result.description;
        element.publishedDate = result.publishedDate;
        this.snackBar.open('Book updated successfully!', '', { duration: 2000 });
        this.dataSource = [...this.books];  // Refresca la tabla tras la edición
      }
    });
  }

  onDelete(element: Ibook): void {
    const confirmDelete = confirm(`Are you sure you want to delete ${element.title}?`);
    if (confirmDelete) {
      const index = this.books.indexOf(element);
      if (index > -1) {
        this.books.splice(index, 1);  // Eliminar de `books`
        this.dataSource = [...this.books];  // Actualizar la fuente de datos
        this.snackBar.open('Book deleted successfully!', '', { duration: 2000 });
      }
    }
  }
}
