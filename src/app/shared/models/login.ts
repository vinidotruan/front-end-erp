import { FormControl, Validators } from '@angular/forms';

export class Login {

    user = new FormControl('', Validators.required);
    password = new FormControl('', Validators.required);
}