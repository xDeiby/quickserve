import { useDispatch, useSelector } from "react-redux";
import { ITable } from "../../../types/ITable";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { getStatusIcon } from "../utils/getStatusIcon";
import { getStatusColor } from "../utils/getStatusOrderColor";

import {
  setIsDialogOpen,
  setSelectedTable,
} from "../../../store/slices/orderSlice";
// import { useGetTablesQuery } from "../../../store/apis/tablesApi";
import { TableStatusEnum } from "../../../types/TableStatus";
import { RootState } from "../../../store/store";

export default function WaiterTableCards() {
  // const { isLoading, data: tables = [] } = useGetTablesQuery({});
  const tables = useSelector((state: RootState) => state.app.tables);
  const dispatch = useDispatch();

  const handleTableClick = (table: ITable) => {
    dispatch(setSelectedTable(table));
    dispatch(setIsDialogOpen(true));
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tables.map((table) => (
        <Card
          key={table.id}
          className={`cursor-pointer hover:shadow-md transition-shadow ${
            table.status === TableStatusEnum.AVAILABLE ? "border-green-300" : ""
          }`}
          onClick={() => handleTableClick(table)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Table {table.code}</h3>
              <Badge variant="outline">{table.capacity} seats</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(
                  table.status
                )}`}
              >
                {getStatusIcon(table.status)}
                <span className="capitalize">{table.status}</span>
              </div>
              {table?.orders && (
                <Badge variant="secondary">{table.orders.length} items</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
