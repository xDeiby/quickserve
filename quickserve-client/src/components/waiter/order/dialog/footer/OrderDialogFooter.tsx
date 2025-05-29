import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { Button } from "../../../../ui/button";
import { DialogFooter } from "../../../../ui/dialog";
import { setIsDialogOpen } from "../../../../../store/slices/orderSlice";
import { TableStatusEnum } from "../../../../../types/TableStatus";

export default function OrderDialogFooter() {
  const { selectedTable, currentOrder } = useSelector(
    (state: RootState) => state.tables
  );
  const dispatch = useDispatch();

  const saveOrder = () => {};

  const submitOrder = () => {
    if (selectedTable) {
      dispatch(setIsDialogOpen(false));
    }
  };

  const processBill = () => {
    if (selectedTable) {
      dispatch(setIsDialogOpen(false));
    }
  };

  const clearTable = () => {
    if (selectedTable) {
      dispatch(setIsDialogOpen(false));
    }
  };

  const markAsServed = () => {
    if (selectedTable) {
      dispatch(setIsDialogOpen(false));
    }
  };

  return (
    <DialogFooter className="flex flex-wrap gap-2 sm:gap-0">
      {selectedTable?.status === TableStatusEnum.AVAILABLE && (
        <Button onClick={saveOrder} disabled={currentOrder.length === 0}>
          Save Order
        </Button>
      )}

      {(selectedTable?.status === TableStatusEnum.OCCUPIED ||
        selectedTable?.status === TableStatusEnum.ORDERING) && (
        <Button onClick={submitOrder} disabled={currentOrder.length === 0}>
          Send to Kitchen
        </Button>
      )}

      {selectedTable?.status === TableStatusEnum.PREPARING && (
        <Button onClick={markAsServed}>Mark as Served</Button>
      )}

      {selectedTable?.status === TableStatusEnum.SERVED && (
        <Button onClick={processBill}>Process Bill</Button>
      )}

      {selectedTable?.status === TableStatusEnum.BILLING && (
        <Button onClick={clearTable} variant="destructive">
          Clear Table
        </Button>
      )}

      <Button
        variant="outline"
        onClick={() => dispatch(setIsDialogOpen(false))}
      >
        Close
      </Button>
    </DialogFooter>
  );
}
