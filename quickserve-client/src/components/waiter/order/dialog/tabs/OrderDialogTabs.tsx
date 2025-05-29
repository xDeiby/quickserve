import { Tabs, TabsList, TabsTrigger } from "../../../../ui/tabs";
import DialogMenuTab from "./DialogMenuTab";
import DialogOrderTab from "./DialogOrderTab";

export default function OrderDialogTabs() {
  return (
    <Tabs defaultValue="menu" className="flex-1 overflow-hidden flex flex-col">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="menu">Menu</TabsTrigger>
        <TabsTrigger value="order">Current Order</TabsTrigger>
      </TabsList>

      <DialogMenuTab />

      <DialogOrderTab />
    </Tabs>
  );
}
