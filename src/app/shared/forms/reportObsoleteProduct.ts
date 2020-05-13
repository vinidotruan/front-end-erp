import { FormControl, Validators } from '@angular/forms';

export class ReportObsoleteProduct {
    constructor(private authUserId?) {
    }
    id? = new FormControl(null);
    user_id = new FormControl(this.authUserId ??null, Validators.required);
    since = new FormControl(null, Validators.required);
    at = new FormControl(null,Validators.required);
    data = new FormControl(null,Validators.required);
    minimun_amount = new FormControl(null,Validators.required);
}