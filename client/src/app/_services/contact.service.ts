import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  newContact(model: any) {
    return this.http.post(this.baseUrl + 'contacts/createContact', model);
  }

  getContacts() {
    return this.http.get<Partial<Contact[]>>(this.baseUrl + 'contacts/allContacts');
  }

  getContact(id: number) {
    return this.http.get<Partial<Contact>>(this.baseUrl + 'contacts/getContact/' + id);
  }

  updateContact(id: number, model: any) {
    return this.http.put(this.baseUrl + 'contacts/updateContact/' + id, model);
  }
}
