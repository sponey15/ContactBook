import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  @Output() cancelNew = new EventEmitter();
  contact: Contact;
  contactForm: FormGroup;

  constructor(private contactService: ContactService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  newContact() {
    this.contactService.newContact(this.contactForm.value).subscribe(response => {
      this.router.navigate(['']);
      this.cancelNew.emit(false);
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelNew.emit(false);
  }
}
