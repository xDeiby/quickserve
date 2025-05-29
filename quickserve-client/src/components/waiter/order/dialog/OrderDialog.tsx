import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import OrderDialogFooter from "./footer/OrderDialogFooter";
import OrderDialogTabs from "./tabs/OrderDialogTabs";
import { RootState } from "../../../../store/store";
import { setIsDialogOpen } from "../../../../store/slices/orderSlice";

export default function OrderDialog() {
  const { selectedTable, isDialogOpen, currentOrder } = useSelector(
    (state: RootState) => state.tables
  );

  const dispatch = useDispatch();

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => dispatch(setIsDialogOpen(open))}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          {selectedTable && (
            <DialogTitle>
              Table {selectedTable.number} -{" "}
              {selectedTable.status.charAt(0).toUpperCase() +
                selectedTable.status.slice(1)}
            </DialogTitle>
          )}
          <DialogDescription>
            {selectedTable?.seats} seats | {currentOrder.length} items ordered
          </DialogDescription>
        </DialogHeader>

        <OrderDialogTabs />

        <OrderDialogFooter />
      </DialogContent>
    </Dialog>
  );
}
