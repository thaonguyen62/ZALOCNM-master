import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Contact} from '@app/_models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactSubject: BehaviorSubject<Contact>;
  public contact: Observable<Contact>;
  public contactvalue: Contact ;
  public url = '';


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.contactSubject = new BehaviorSubject<Contact>(this.contactvalue);
    this.contact = this.contactSubject.asObservable();
  }
  public get contactValue(): Contact {
    return this.contactSubject.value;

  }
  // tslint:disable-next-line:typedef
  saveContact(idRequest: string , idTarget: string){

    // @ts-ignore
    return this.http.post(this.url + `saveContact/${idRequest}/${idTarget}`);
  }
  // tslint:disable-next-line:typedef
  getListContactFriendByUser(id: string){
    return this.http.get<Contact[]>(this.url + `getContacts/target/${id}`);
  }
  // tslint:disable-next-line:typedef
  getAllContactsByUser(id: string){
    return this.http.get<Contact[]>(this.url + `getContacts/user/${id}`);
  }

  // tslint:disable-next-line:typedef
  getContactByNameOrPhone(q: string){
    // @ts-ignore
    return this.http.get<Contact[]>(this.url + `getContacts/query`, q );
  }
  // tslint:disable-next-line:typedef
  editContact(contact: Contact){
    // @ts-ignore
    return this.http.put(this.url + `editContact`, contact ) ;
  }
  // tslint:disable-next-line:typedef
  deleteContact(contact: Contact){
    // @ts-ignore
    return this.http.delete(this.url + `deleteContact`, contact ) ;
  }
// tslint:disable-next-line:typedef
  checkRequestFriend(idRequest: string, idTarget: string){
    return this.http.get<number>(this.url + 'getContact?idRequest=' + idRequest + '&idTarget=' + idTarget);
  }
}
