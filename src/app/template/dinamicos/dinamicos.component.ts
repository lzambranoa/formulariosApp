import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  nuevoJuego: string = '';

  @ViewChild('miFormulario') miFormulario!: NgForm

  persona: Persona = {
    nombre: 'Leonardo',
    favoritos: [
      {id: 1, nombre: 'Mario Bros'},
      {id: 2, nombre: 'Contra'}
    ]

  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = ''
  }

  nombreValido(): boolean {
     return this.miFormulario?.controls['nombre']?.errors != null
  }

  guardar(){
    console.log('Formulario posteado')
  }

  eliminar(index:number){
    this.persona.favoritos.splice( index, 1 )
  }

}
