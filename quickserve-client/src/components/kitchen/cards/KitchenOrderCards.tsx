import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock, Coffee, CheckCircle } from "lucide-react";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ScrollArea } from "../../ui/scroll-area";
import { RootState } from "../../../store/store";
import { OrderStatusEnum } from "../../../types/OrderStatus";
import { useSocketConnection } from "../../../hooks/useSocketConnection";
import { setOrders } from "../../../store/slices/kitchenSlice";
import { IOrder } from "../../../types/IOrder";

export default function KitchenOrderCards() {
  const filteredOrders = useSelector(
    (state: RootState) => state.kitchen.filteredOrders
  );
  const dispatch = useDispatch();

  const { socket, isWsConnected } = useSocketConnection();

  useEffect(() => {
    if (!socket || !isWsConnected) return;

    const onGetOrders = (data: IOrder[]) => {
      dispatch(setOrders(data));
    };

    socket.emit("orders");
    socket.on("orders", onGetOrders);
    return () => {
      socket.off("orders", onGetOrders);
    };
  }, [socket, isWsConnected, dispatch]);

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "rush":
        return <Badge className="bg-red-500">RUSH</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High Priority</Badge>;
      default:
        return null;
    }
  };

  // Calculate time elapsed since order was received
  const getTimeElapsed = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    return `${diffMins} minutes ago`;
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <Card
            key={order.id}
            className={`
  ${
    order.status === OrderStatusEnum.PENDING
      ? "border-l-4 border-l-red-500"
      : ""
  }
  ${
    order.status === OrderStatusEnum.IN_PROGRESS
      ? "border-l-4 border-l-yellow-500"
      : ""
  }
  ${
    order.status === OrderStatusEnum.COMPLETED
      ? "border-l-4 border-l-green-500"
      : ""
  }
`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Table {order.code}
                    {getPriorityBadge("high")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTimeElapsed(new Date(order.createdAt))}
                  </p>
                </div>
                <Badge
                  variant={
                    order.status === OrderStatusEnum.PENDING
                      ? "destructive"
                      : order.status === OrderStatusEnum.IN_PROGRESS
                      ? "default"
                      : "outline"
                  }
                >
                  {order.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.menuItemId}`}
                    className="flex justify-between items-start border-b pb-2"
                  >
                    <div>
                      <div className="font-medium">
                        {item.quantity}x {"nose"}
                      </div>
                      {/* {item.specialInstructions && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {item.specialInstructions}
                        </div>
                      )} */}
                    </div>
                    {/* <div className="text-sm text-muted-foreground">
                      {item.preparationTime} min
                    </div> */}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                {/* <div className="text-sm">
                  <span className="font-medium">Est. time:</span>{" "}
                  {getEstimatedPrepTime(order.items)} min
                </div> */}
                <div className="text-sm">
                  <span className="font-medium">Items:</span>{" "}
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              {order.status === OrderStatusEnum.PENDING && (
                <Button className="w-full" onClick={() => {}}>
                  <Coffee className="mr-2 h-4 w-4" />
                  Start Preparing
                </Button>
              )}
              {order.status === OrderStatusEnum.IN_PROGRESS && (
                <Button className="w-full" variant="outline" onClick={() => {}}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Ready
                </Button>
              )}
              {order.status === OrderStatusEnum.COMPLETED && (
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => {}}
                >
                  Served
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No orders found in this category
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
