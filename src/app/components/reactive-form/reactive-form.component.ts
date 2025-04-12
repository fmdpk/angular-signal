import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent implements OnInit {
  form: Signal<FormGroup> = signal(
    new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  );
  isFormValid = computed(() => this.form().invalid);
  // Convert form values to signals
  firstNameSignal = signal(this.form().controls['firstName'].value);
  emailSignal = signal(this.form().controls['email'].value);

  ngOnInit(): void {
    console.log('isFormValid :' + !this.isFormValid());
  }

  submit() {
    if (this.form().valid) {
      console.log('Form Submitted:', this.form().value);
      console.log('firstName :' + this.firstNameSignal());
      console.log('isFormValid :' + !this.isFormValid());
      console.log('email :' + this.emailSignal());
    }
  }
}
