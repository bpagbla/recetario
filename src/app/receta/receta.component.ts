import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BbddService } from '../bbdd.service';
import { Observable } from 'rxjs';
import { Receta } from '../interfaces/receta';

@Component({
  selector: 'app-receta',
  imports: [CommonModule],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})

export class RecetaComponent implements OnInit{
  receta: Receta | null = null;  // Ahora es de tipo Receta, o null si no se encuentra
  id: string;
  constructor(private route: ActivatedRoute, private bbdd: BbddService) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  async ngOnInit() {
   this.receta = await this.bbdd.getReceta(this.id);
  }
}
