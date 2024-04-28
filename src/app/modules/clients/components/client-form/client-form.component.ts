import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostClientForm } from 'src/app/modules/core/models/client.model';
import { FormsService } from 'src/app/modules/core/services/forms.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup<PostClientForm>;

  constructor(private formsService: FormsService) {}

  get controls() {
    return this.clientForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      surname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postcode: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onAddClient() {
    console.log(this.clientForm.value);
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }
}
