import { PlusCircle, Utensils, Clock, DollarSign } from "lucide-react";
import { TableStatusEnum } from "../../../types/TableStatus";

export const getStatusIcon = (status: TableStatusEnum) => {
  switch (status) {
    case TableStatusEnum.AVAILABLE:
      return null;
    case TableStatusEnum.OCCUPIED:
      return <PlusCircle className="h-4 w-4 mr-1" />;
    case TableStatusEnum.ORDERING:
      return <PlusCircle className="h-4 w-4 mr-1" />;
    case TableStatusEnum.PREPARING:
      return <Utensils className="h-4 w-4 mr-1" />;
    case TableStatusEnum.SERVED:
      return <Clock className="h-4 w-4 mr-1" />;
    case TableStatusEnum.BILLING:
      return <DollarSign className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};
