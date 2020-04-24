import { AbstractControl, ValidationErrors } from '@angular/forms';

export function equalValidator(control: AbstractControl): ValidationErrors | null {

  let hasError = false;
  let previousValue = null;

  // Make sure the control has been touched
  if (!control.touched) {
    return null;
  }

  for (const c of Object.keys(control.value)) {
    const v = control.get(c).value;

    if (previousValue === null) {
      previousValue = v;
      continue;
    }

    if (v !== previousValue) {
      hasError = true;
      control.get(c).setErrors({ equalValidator: true });
      break;
    } else {
      control.get(c).setErrors(null);
      control.get(c).markAsTouched();
      break;
    }
  }

  return hasError ? { equalValidator: true } : null;
}
