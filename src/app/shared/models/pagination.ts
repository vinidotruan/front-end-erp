import { Sale } from './sale'
import { Category } from './category'
import { Product } from './product'
import { User } from './user'

export class Pagination {
    current_page: number
    data: Sale[] | Category[] | Product [] | User[]  | any[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
}
