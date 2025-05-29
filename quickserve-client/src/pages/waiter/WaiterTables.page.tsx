import { useEffect } from "react";
import { useDispatch } from "react-redux";

import WaiterTableCards from "../../components/waiter/tables/WaiterTableCards";
import OrderDialog from "../../components/waiter/order/dialog/OrderDialog";
import { useSocketConnection } from "../../hooks/useSocketConnection";
import { ITable } from "../../types/ITable";
import { setTables } from "../../store/slices/appSlice";

export default function WaiterTablesPage() {
  const { socket, isWsConnected } = useSocketConnection();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket || !isWsConnected) return;

    const onGetTables = (tables: ITable[]) => {
      dispatch(setTables(tables));

      console.log("Tables updated:", tables);
    };

    socket.on("tables", onGetTables);
    socket.emit("tables");

    return () => {
      socket.off("tables", onGetTables);
    };
  }, [socket, isWsConnected, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Restaurant Floor Plan</h1>
        <p className="text-muted-foreground">Manage tables and orders</p>
      </header>

      <WaiterTableCards />

      <OrderDialog />
    </div>
  );
}
