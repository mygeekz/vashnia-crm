
export type View = 'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'reports' | 'tickets' | 'settings';

export enum ProductStatus {
    Available = 'موجود',
    Unavailable = 'ناموجود'
}

export interface Product {
    id: string;
    name: string;
    category: string;
    status: ProductStatus;
}

export enum OrderStatus {
    New = 'جدید',
    Confirmed = 'تأییدشده',
    Shipped = 'ارسال‌شده'
}

export interface Order {
    id: string;
    customerName: string;
    date: string;
    status: OrderStatus;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    address: string;
    joinDate: string;
}

export enum TicketStatus {
    Open = 'باز',
    Closed = 'بسته شده',
    InProgress = 'در حال بررسی'
}

export interface Ticket {
    id: string;
    title: string;
    department: string;
    status: TicketStatus;
    lastUpdate: string;
}
