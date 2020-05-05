import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { SignUp } from '../../store/actions/auth.actions';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  registerForm: FormGroup;
  submitted = false;
  // @ts-ignore
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.getState = this.store.select(selectAuthState);
  }


  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.registerForm.controls; }

  /**
   * This method is called when the user submits the request to signup.
   * Payload of name email and password is dipatched to the store.
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const payload = this.registerForm.value;
    this.store.dispatch(new SignUp(payload));
  }


}
 








