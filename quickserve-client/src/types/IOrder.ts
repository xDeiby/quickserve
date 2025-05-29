import { OrderPriorityEnum } from "./OrderPriorityEnum";
import { OrderStatusEnum } from "./OrderStatus";

export interface IOrderItem {
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  specialRequests?: string;
  createdAt: string;
}

export interface IOrder {
  id: string;
  code: string;
  priority: OrderPriorityEnum;
  tableId: string;
  waiterId: string;
  chefId?: string;
  status: OrderStatusEnum;
  totalAmount: number;
  items: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}
