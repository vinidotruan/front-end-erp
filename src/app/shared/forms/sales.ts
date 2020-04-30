import { FormControl, Validators } from '@angular/forms';

export class SaleForm {
    id? = new FormControl(null);
    user_id = new FormControl(null, Validators.required);
    product_id = new FormControl(null, Validators.required);
    amount = new FormControl(0, Validators.required);    
    price = new FormControl(0.0, Validators.required);    
}