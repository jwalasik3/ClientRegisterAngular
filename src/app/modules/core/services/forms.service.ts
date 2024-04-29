import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('minlength')) {
      return 'Input too short';
    }

    if (control.hasError('maxlength')) {
      return 'Input too long';
    }

    if (control.hasError('invalidPostcode')) {
      return 'Postcode is invalid';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }
}
