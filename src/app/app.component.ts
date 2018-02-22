import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  singUpForm: FormGroup;
  forbiddenUserNames = ['Honkey', 'Cracker'];
  hobinggies= ['naked dancing', 'kike flying', 'streaming'];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.singUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.singUpForm.valueChanges.subscribe((value) => console.log(value));
    this.singUpForm.statusChanges.subscribe((status) => console.log(status));
this.singUpForm.setValue({
  'userData': {
    'username': 'John',
    'email': 'valid@email.com'
  },
  'gender': 'male',
  'hobbies': []
});
this.singUpForm.patchValue({
'userData': {
  'username': 'Paul'
}}) ;
  }

  onSubmit1() {
    console.log(this.singUpForm);
    this.singUpForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.singUpForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbiden': true});
        }else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
