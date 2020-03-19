import { FormControl, Validators } from '@angular/forms';

export class ProductForm {

    id = new FormControl(null);
    title = new FormControl('', Validators.required);
    ref = new FormControl('', Validators.required);
    category_id = new FormControl(null, Validators.required);
    application = new FormControl('', Validators.required);
    value_cost = new FormControl('', Validators.required);
    value_sell = new FormControl('', Validators.required);
    amount = new FormControl('', Validators.required);    
}