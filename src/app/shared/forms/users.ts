import { FormControl, Validators } from '@angular/forms';

export class UserForm {
    id? = new FormControl(null);
    role_id = new FormControl(null, Validators.required);
    cpf = new FormControl(null, Validators.required);
    email = new FormControl(null,Validators.required);
    password = new FormControl(null,Validators.required);
    name = new FormControl(null,Validators.required);
    user = new FormControl(null,Validators.required);
}