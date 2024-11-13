import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';  // Importar el módulo de diálogo
import { MatSnackBarModule } from '@angular/material/snack-bar';  // Importar el módulo de snack-bar
import { MatTableModule } from '@angular/material/table';
import { TableBiblaryComponent } from "./components/table-biblary/table-biblary.component";  // Importar el módulo de tabla

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatDialogModule, MatSnackBarModule, TableBiblaryComponent],  // Importar los módulos necesarios
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'biblioteca';
}
