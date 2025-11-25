import { AbstractControl, ValidationErrors } from '@angular/forms';
import { cnpj } from 'cpf-cnpj-validator';

export function cnpjValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  // Deixa o "required" cuidar do campo vazio
  if (!value) {
    return null;
  }

  // Remove máscara
  const cleaned = value.replace(/[^\d]/g, '');

  // Valida usando a biblioteca
  console.log((cleaned))
  console.log(cnpj.isValid(cleaned))

  if (!cnpj.isValid(cleaned)) {
    return { cnpjInvalid: true };
  }

  return null;
}
