import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator.service';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [this.emailValidator]],
    username: ['', [ Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
    password2: ['', [ Validators.required ]],
  }, 
  {
    // opciones que podemos pasarle a nuestro FormGroup
    validators: [ this.validatorService.camposIguales('password','password2')]
  })

  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;

    if( errors?.['required'] ) {
      return 'El mail es obligatorio';
    } else if( errors?.['pattern']){
      return 'El valor ingresado no tiene formato de correo electronico'
    } else if( errors?.['emailTomado']){
      return 'El email ya se encuentra registrado';
    }

    return '';
  }

  constructor(  private fb: FormBuilder,
                private validatorService: ValidatorService,
                private emailValidator: EmailValidatorService) { }

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

  // // validacion para mensaje de email requerido
  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.['required']
  //           && this.miFormulario.get('email')?.touched;
  // }

  // // validacion para mensaje de email tiene un formato no valido
  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //           && this.miFormulario.get('email')?.touched;
  // }

  // // validacion para mensaje de email tiene un formato no valido
  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //           && this.miFormulario.get('email')?.touched;
  // }



  submitFormulario() {
    console.log(this.miFormulario.value);

    // Dispara las validaciones en cada uno de los campos del formulario
    this.miFormulario.markAllAsTouched();
  }

}
