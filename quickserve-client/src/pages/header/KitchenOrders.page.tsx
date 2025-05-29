import KitchenOrdersFilters from "../../components/kitchen/header/KitchenOrdersFilters";
import KitchenNotifications from "../../components/kitchen/header/KitchenNotifications";
import KitchenOrderCards from "../../components/kitchen/cards/KitchenOrderCards";

export default function KitchenOrdersPage() {
  return (
    <div className="container mx-auto p-4">
      <KitchenNotifications />

      <KitchenOrdersFilters />

      <KitchenOrderCards />
    </div>
  );
}
