import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

/* INTERFACES */
import { Receta } from '../interfaces/receta';

/* SERVICIOS */
import { NotifService } from '../notif.service';
import { BbddService } from '../bbdd.service';

@Component({
  selector: 'app-recetas',
  imports: [CommonModule],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})

export class RecetasComponent {
  constructor(private bbddService: BbddService, private notifService: NotifService) { }

  recetas: Receta[] = [];

  async ngOnInit() {
    this.recetas = await this.bbddService.getRecetas();
    console.log('Recetas cargadas:', this.recetas);
  }
  
}
