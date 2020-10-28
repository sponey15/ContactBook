import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter();
  @Input() contactsFromHomeComponent: any;
  contactForm: FormGroup;
  contact: any;

  constructor(private contactService: ContactService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createContactForm();
    // console.log(this.contact.id);
    console.log(this.contactsFromHomeComponent);
    this.getContact();
  }

  getContact() {
    this.contactService.getContact(this.contactsFromHomeComponent).subscribe(contact => {
      this.contact = contact;
    });
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

  updateContact() {
    this.contactService.updateContact(this.contactsFromHomeComponent, this.contactForm.value).subscribe(response => {
      this.router.navigate(['']);
      this.cancelEdit.emit(false);
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelEdit.emit(false);
  }
}
