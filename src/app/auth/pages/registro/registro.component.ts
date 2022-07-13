import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ]],
    username: ['', [ Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
    password2: ['', [ Validators.required ]],
  }, 
  {
    // opciones que podemos pasarle a nuestro FormGroup
    validators: [ this.validatorService.camposIguales('password','password2')]
  })

  constructor(  private fb: FormBuilder,
                private validatorService: ValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Leonardo Zambrano',
      email: 'leonardo@gmail.com',
      username: 'leonardo_79',

    })
  }

  // muestra u oculta el mensaje de error de forma condicional
  campoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    // Dispara las validaciones en cada uno de los campos del formulario
    this.miFormulario.markAllAsTouched();
  }

}
