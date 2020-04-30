import { Category } from './category';

export class Product {
    id: number;
    title: string;
    ref: number;
    category_id: number;
    amount: number;
    value_cost: any;
    value_sell: any;
    application: string;
    category?:Category
}