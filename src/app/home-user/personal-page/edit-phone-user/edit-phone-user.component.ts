import { Component, OnInit } from '@angular/core';
// import {FormBuilder, FormGroup} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '@app/_models';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService, AlertService} from '@app/_services';
import {AppComponent} from '@app/app.component';
import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-phone-user',
  templateUrl: './edit-phone-user.component.html',
  styleUrls: ['./edit-phone-user.component.less']
})
export class EditPhoneUserComponent implements OnInit {

  form: FormGroup;
  id: string;
  // isAddMode: boolean;
  loading: boolean;
  submitted: boolean;
  user: User = new User();
  userSubject: BehaviorSubject<User>;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private u: AppComponent
  ) {
  }


  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.form = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
    this.submitted = false;
    this.loading = false;
    // this.id = this.route.snapshot.paramMap.get('id');
//    const result = JSON.parse(window.localStorage.getItem())
    console.log(this.id);
    // console.log(this.form.value.id);
    // this.isAddMode = !this.id;
    this.user = this.u.getUser();
    console.log(this.user.id);
    this.getUser(this.user.id);

  }


  // tslint:disable-next-line:typedef
  get f() { return this.form.controls; }
  // tslint:disable-next-line:typedef
  getUser(id) {
    this.accountService.getById(id)
      .subscribe((data: User) => {
        /*this.category = data;*/
        this.user = data;
        console.log(data);
      });
  }


  // convenience getter for easy access to form fields
  /*get f() {
    return this.form.controls;
  }*/

  // tslint:disable-next-line:typedef
  editPhone() {
    if (this.form.invalid) {
      // console.log(this.form.errors);
      // console.log(this.form.get('phone').hasError('minLength'));
      // console.log(this.form.get('phone').hasError('maxLength'));
      // console.log(this.form.get('phone').hasError('pattern'));
      // console.log(this.form.get('phone'));
      return;
    }
    this.submitted = true;
   // this.userSubject = new BehaviorSubject<User>(this.user);
   //  console.log(this.user.username);
    this.accountService.update(this.user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Cập nhật thành công', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });

  }



}
