import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

export type MyFormModel = {
  firstName: string;
  lastName: string;
};

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss',
})
export class TemplateDrivenFormComponent {
  @ViewChild('form') protected ngForm: NgForm | undefined;
  protected readonly formValue = signal<MyFormModel>({
    firstName: '',
    lastName: '',
  });

  ngAfterViewInit(): void {
    this.ngForm!.form.valueChanges.subscribe((v) => {
      this.formValue.set(v);
    });
  }

  onFirstNameChange() {
    console.log('firstName: ' + this.formValue().firstName);
  }

  onLastNameChange() {
    console.log('lastName: ' + this.formValue().lastName);
  }

  onFormSubmit() {
    console.log('Form submitted: ', this.formValue());
  }
}
