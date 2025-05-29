import { Bell } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";

export default function KitchenNotifications() {
  const hasNewOrder = true; // This should be replaced with actual state management
  const [showNotification, setShowNotification] = useState(false);

  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Kitchen Orders</h1>
        <p className="text-muted-foreground">
          Manage and track food preparation
        </p>
      </div>
      <div className="relative">
        <Button
          variant={hasNewOrder ? "default" : "outline"}
          className="relative"
          onClick={() => setShowNotification(false)}
        >
          <Bell className="h-5 w-5" />
          {hasNewOrder && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
          )}
        </Button>

        {showNotification && (
          <div className="absolute top-full right-0 mt-2 p-3 bg-white rounded-lg shadow-lg border z-50 w-64 animate-in fade-in slide-in-from-top-5">
            <p className="font-medium">New order received!</p>
            <p className="text-sm text-muted-foreground">
              {/* Table {orders[0]?.tableNumber} */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
