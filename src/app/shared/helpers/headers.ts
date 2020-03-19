import { HttpHeaders } from "@angular/common/http";

export const headers = new HttpHeaders().append('Content-Type','application/json').append('X-Requested-With', 'XMLHttpRequest');