import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contacts: Partial<Contact[]>;
  contactToEdit: any;
  editMode = false;
  newMode = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  editToggle(contactReceived: any) {
    this.contactToEdit = contactReceived;
    this.editMode = true;
  }
  newToggle() {
    this.newMode = true;
  }

  cancelEditMode(editMode: boolean){
    this.editMode = editMode;
    this.getContacts();
  }

  cancelNewMode(newMode: boolean){
    this.newMode = newMode;
    this.getContacts();
  }
}
