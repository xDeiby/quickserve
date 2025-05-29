import { IOrder } from "./IOrder";
import { TableStatusEnum } from "./TableStatus";

export interface ITable {
  id: number;
  code: string;
  capacity: number;
  status: TableStatusEnum;
  orders?: IOrder[];
}
