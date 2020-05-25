import { FormControl, Validators } from '@angular/forms';

export class Recovery {

    email = new FormControl('', Validators.required);
    password = new FormControl('', Validators.required);
    password_confirmation = new FormControl('', Validators.required);
    token = new FormControl('', Validators.required);

}