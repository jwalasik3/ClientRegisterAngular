import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  errorMessage = '';
  registerForm = new FormGroup(
    {
      email: new FormControl('', {
        validators: [
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
        nonNullable: true,
      }),
      username: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      // hobbies: new FormArray([new FormControl('')]),
    }
    // { updateOn: 'submit' }
  );

  constructor(private authService: AuthService, private router: Router) {}

  get controls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) => {
    //   console.log(text);
    // });
    // this.controls.username.addValidators(Validators.minLength(5)); // dodaje validator do istniejących, alternatywa to setValidators, ona napisuje wcześniejsze
    console.log('');
  }

  // addControl() {
  //   this.controls.hobbies.push(new FormControl(''));
  // }

  // removeControl(index: number) {
  //   this.controls.hobbies.removeAt(index);
  // }

  onRegister() {
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'An error occured.';
      },
    });
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('minlength')) {
      return 'Email too short';
    }

    if (control.hasError('maxlength')) {
      return 'Email too long';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }
}
