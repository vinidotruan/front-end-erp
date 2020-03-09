import { FormControl, Validators } from '@angular/forms';

export class CategoryForm {
    id = new FormControl();    
    name = new FormControl('', Validators.required);    
}