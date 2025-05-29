import { useDispatch } from "react-redux";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  KitchenOrderByFilter,
  KitchenOrderStatusFilter,
  setOrderByFilter,
  setStatusFilter,
} from "../../../store/slices/kitchenSlice";
import { OrderStatusEnum } from "../../../types/OrderStatus";

export default function KitchenOrdersFilters() {
  const dispatch = useDispatch();

  const changeStatusFilter = (status: string) => {
    dispatch(setStatusFilter(status as KitchenOrderStatusFilter));
  };

  const changeSortByFilter = (sortBy: string) => {
    dispatch(setOrderByFilter(sortBy as KitchenOrderByFilter));
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={changeStatusFilter}
      >
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value={OrderStatusEnum.PENDING}>New</TabsTrigger>
          <TabsTrigger value={OrderStatusEnum.IN_PROGRESS}>
            In progress
          </TabsTrigger>
          <TabsTrigger value={OrderStatusEnum.COMPLETED}>Completed</TabsTrigger>
          <TabsTrigger value={OrderStatusEnum.CANCELLED}>Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="ml-4 flex-shrink-0">
        <Select defaultValue="time" onValueChange={changeSortByFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="time">Sort by Time</SelectItem>
            <SelectItem value="table">Sort by Table</SelectItem>
            <SelectItem value="status">Sort by Status</SelectItem>
            <SelectItem value="priority">Sort by Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
