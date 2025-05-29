import { useCallback } from "react";
import { OrderItem } from "../../../../../types/OrderItem";
import { Button } from "../../../../ui/button";
import { ScrollArea } from "../../../../ui/scroll-area";
import { TabsContent } from "../../../../ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { removeMenuItem } from "../../../../../store/slices/orderSlice";

export default function DialogOrderTab() {
  const currentOrder = useSelector(
    (state: RootState) => state.tables.currentOrder
  );

  const dispatch = useDispatch();

  const calculateTotal = useCallback((items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, []);

  return (
    <TabsContent value="order" className="flex-1 overflow-hidden flex flex-col">
      <ScrollArea className="flex-1">
        {currentOrder.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No items in order yet
          </div>
        ) : (
          <div className="space-y-2">
            {currentOrder.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.quantity}x</span>
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => dispatch(removeMenuItem(item.id))}
                  >
                    <span className="font-bold">−</span>
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center p-2 font-bold">
              <span>Total</span>
              <span>${calculateTotal(currentOrder).toFixed(2)}</span>
            </div>
          </div>
        )}
      </ScrollArea>
    </TabsContent>
  );
}
