import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telenum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'Tirst name is required',
      'minlength': 'First name must be atleast 2 characters long',
      'maxlength': 'First name cannot exceed 25 characters'
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Last name must be atleast 2 characters long',
      'maxlength': 'Last name cannot exceed 25 characters'
    },
    'telenum': {
      'required': 'Tel. number is required',
      'pattern': 'Tel. number should only have numbers'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'

    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // to reset validation messages
  }

  printObj(x?: any): string {
    let s = '';
    for (const prop in x) { if (x.hasOwnProperty(prop)) { s += prop + ': ' + x[prop] + '; '; } }
    return s;
  }

onValueChanged(data?: any) {
  if (!this.feedbackForm) { return; }
  const form = this.feedbackForm;

  // tslint:disable-next-line:forin
  for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && (control.dirty || !control.pristine) && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
  }
}

onSubmit() {
  this.feedback = this.feedbackForm.value;
  this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
  });
}


}
