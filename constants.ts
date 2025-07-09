
import { Product, ProductStatus, Order, OrderStatus, Customer, Ticket, TicketStatus } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 'VSH-001', name: 'پسته اکبری ممتاز', category: 'آجیل', status: ProductStatus.Available },
  { id: 'VSH-002', name: 'برنج هاشمی درجه یک', category: 'برنج', status: ProductStatus.Available },
  { id: 'VSH-003', name: 'شکلات تلخ ۷۰٪', category: 'شکلات', status: ProductStatus.Unavailable },
  { id: 'VSH-004', name: 'بادام هندی', category: 'آجیل', status: ProductStatus.Available },
  { id: 'VSH-005', 'name': 'انجیر خشک استهبان', 'category': 'خشکبار', 'status': ProductStatus.Available },
  { id: 'VSH-006', 'name': 'تخمه آفتابگردان', 'category': 'تنقلات', 'status': ProductStatus.Available },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-9801', customerName: 'شعبه تهران', date: '۱۴۰۳/۰۵/۰۱', status: OrderStatus.Shipped },
  { id: 'ORD-9802', customerName: 'مشتری حقیقی - احمدی', date: '۱۴۰۳/۰۵/۰۳', status: OrderStatus.Confirmed },
  { id: 'ORD-9803', customerName: 'شعبه اصفهان', date: '۱۴۰۳/۰۵/۰۴', status: OrderStatus.New },
  { id: 'ORD-9804', customerName: 'شعبه شیراز', date: '۱۴۰۳/۰۵/۰۴', status: OrderStatus.New },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'CUS-101', name: 'شعبه مرکزی تهران', phone: '021-12345678', address: 'تهران، میدان آزادی', joinDate: '۱۴۰۰/۰۱/۱۵' },
  { id: 'CUS-102', name: 'رضا محمدی', phone: '0912-3456789', address: 'کرج، گوهردشت', joinDate: '۱۴۰۱/۱۱/۰۲' },
  { id: 'CUS-103', name: 'شعبه اصفهان', phone: '031-87654321', address: 'اصفهان، میدان نقش جهان', joinDate: '۱۴۰۰/۰۳/۲۰' },
  { id: 'CUS-104', name: 'فاطمه کریمی', phone: '0935-1112233', address: 'شیراز، خیابان زند', joinDate: '۱۴۰۲/۰۸/۱۰' },
];

export const MOCK_TICKETS: Ticket[] = [
    { id: 'TCK-501', title: 'مشکل در ثبت سفارش جدید', department: 'فنی', status: TicketStatus.Open, lastUpdate: '۲ ساعت پیش' },
    { id: 'TCK-502', title: 'درخواست گزارش فروش ماهانه', department: 'فروش', status: TicketStatus.InProgress, lastUpdate: '۱ روز پیش' },
    { id: 'TCK-503', title: 'عدم نمایش موجودی انبار', department: 'فنی', status: TicketStatus.Closed, lastUpdate: '۳ روز پیش' },
];
