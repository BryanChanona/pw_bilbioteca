import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';  // Importar el módulo de tabla
import { MatDialogModule } from '@angular/material/dialog';  // Importar el módulo de diálogo
import { MatSnackBarModule } from '@angular/material/snack-bar';  // Importar el módulo de snack-bar
import { MatDialog } from '@angular/material/dialog';  // Para abrir diálogos
import { MatSnackBar } from '@angular/material/snack-bar';  // Para mostrar mensajes de notificación
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';  // Importar el componente del diálogo

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table-biblary',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatSnackBarModule],  // Importar los módulos de tabla, diálogo y snack-bar
  templateUrl: './table-biblary.component.html',
  styleUrls: ['./table-biblary.component.scss']
})
export class TableBiblaryComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  // Función para abrir el diálogo de edición
  onEdit(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '400px',
      data: { 
        title: element.name, 
        description: element.symbol, 
        publishedDate: '' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizar datos del libro
        element.name = result.title;
        element.symbol = result.description;
        this.snackBar.open('Book updated successfully!', '', { duration: 2000 });
      }
    });
  }

  // Función para eliminar un libro
  onDelete(element: PeriodicElement): void {
    const confirmDelete = confirm(`Are you sure you want to delete ${element.name}?`);
    if (confirmDelete) {
      // Eliminar libro
      const index = this.dataSource.indexOf(element);
      if (index > -1) {
        this.dataSource.splice(index, 1);
        this.snackBar.open('Book deleted successfully!', '', { duration: 2000 });
      }
    }
  }
}
