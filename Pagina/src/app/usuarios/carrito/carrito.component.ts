import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { JuegoService, Juego } from './../shared/juego.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  displayedColumns: string[] = ['cantidad', 'videojuego', 'precio', 'subtotal'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  videojuego: string;
  cantidad: number;
  precio: number;
  subtotal: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {cantidad: 1, videojuego: 'Hydrogen', precio: 1.0079, subtotal: 'H'},
  {cantidad: 2, videojuego: 'Helium', precio: 4.0026, subtotal: 'He'},
  {cantidad: 3, videojuego: 'Lithium', precio: 6.941, subtotal: 'Li'},
  {cantidad: 4, videojuego: 'Beryllium', precio: 9.0122, subtotal: 'Be'},
  {cantidad: 5, videojuego: 'Boron', precio: 10.811, subtotal: 'B'},
  {cantidad: 6, videojuego: 'Carbon', precio: 12.0107, subtotal: 'C'},
  {cantidad: 7, videojuego: 'Nitrogen', precio: 14.0067, subtotal: 'N'},
  {cantidad: 8, videojuego: 'Oxygen', precio: 15.9994, subtotal: 'O'},
  {cantidad: 9, videojuego: 'Fluorine', precio: 18.9984, subtotal: 'F'},
  {cantidad: 10, videojuego: 'Neon', precio: 20.1797, subtotal: 'Ne'},
  {cantidad: 11, videojuego: 'Sodium', precio: 22.9897, subtotal: 'Na'},
  {cantidad: 12, videojuego: 'Magnesium', precio: 24.305, subtotal: 'Mg'},
  {cantidad: 13, videojuego: 'Aluminum', precio: 26.9815, subtotal: 'Al'},
  {cantidad: 14, videojuego: 'Silicon', precio: 28.0855, subtotal: 'Si'},
  {cantidad: 15, videojuego: 'Phosphorus', precio: 30.9738, subtotal: 'P'},
  {cantidad: 16, videojuego: 'Sulfur', precio: 32.065, subtotal: 'S'},
  {cantidad: 17, videojuego: 'Chlorine', precio: 35.453, subtotal: 'Cl'},
  {cantidad: 18, videojuego: 'Argon', precio: 39.948, subtotal: 'Ar'},
  {cantidad: 19, videojuego: 'Potassium', precio: 39.0983, subtotal: 'K'},
  {cantidad: 20, videojuego: 'Calcium', precio: 40.078, subtotal: 'Ca'},
];
