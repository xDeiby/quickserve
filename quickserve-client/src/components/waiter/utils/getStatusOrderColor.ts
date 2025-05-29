import { TableStatusEnum } from "../../../types/TableStatus";

export const getStatusColor = (status: TableStatusEnum) => {
  switch (status) {
    case TableStatusEnum.AVAILABLE:
      return "bg-green-100 text-green-800";
    case TableStatusEnum.OCCUPIED:
      return "bg-blue-100 text-blue-800";
    case TableStatusEnum.ORDERING:
      return "bg-purple-100 text-purple-800";
    case TableStatusEnum.PREPARING:
      return "bg-yellow-100 text-yellow-800";
    case TableStatusEnum.SERVED:
      return "bg-teal-100 text-teal-800";
    case TableStatusEnum.BILLING:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
