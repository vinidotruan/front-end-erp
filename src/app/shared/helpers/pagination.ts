import { Sale } from '@shared/models/sale';
import { Product } from '@shared/models/product';
import { User } from '@shared/models/user';
import { Category } from '@shared/models/category';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class PaginationHelper {

    /**
     * arrayOfPages - array with all pages numbers
     * actual - actual page of screen
     * 
     * return a range of 5 pagination
     */
    getPagination = (arrayOfPages,actual) => {
        let pages = [];

        if(actual != 1 && actual != -1) {
            pages.push(actual-1);
        }
        
        if(!actual) {
            return -1;
        }

        for (let i = actual; i <= this.getLimiter(arrayOfPages, actual); i++)
            pages.push(i);

        return pages;
    }

    /**
     * array - array with all pages numbers
     * page - GET url parameters page
     * 
     * return false if page is invalid 
     */
    getActual = (array, page:number) => 
        (array.findIndex(index => (index+1) == page) + 1) || false;

    /**
     * array - array with all pages numbers
     * actual - actual page of screen
     * 
     * return the range limit to pagination
     */
    getLimiter = (array: number[], actual: number) => {
        if (array.length > 3 && ((actual + 3) < array.length) && actual != 1) {
            return actual + 3;
        } else if(array.length > 4 && ((actual + 4) < array.length) && actual == 1) {
            return actual + 4
        } else {
          return array.length;
        }
      }
}