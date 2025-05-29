import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Input } from "../../../../ui/input";
import { TabsContent } from "../../../../ui/tabs";
import { Button } from "../../../../ui/button";
import { PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { addMenuItem } from "../../../../../store/slices/orderSlice";
import { useGetMenuItemsQuery } from "../../../../../store/apis/menuItemsApi";
import { useMemo } from "react";

export default function OrderMenuTab() {
  const { isLoading, data: menuItems = [] } = useGetMenuItemsQuery({});
  const dispatch = useDispatch();

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    menuItems.forEach((item) => {
      uniqueCategories.add(item.category);
    });

    return Array.from(uniqueCategories);
  }, [menuItems]);

  if (isLoading) {
    return <div>Loading menu items...</div>;
  }

  return (
    <TabsContent value="menu" className="flex-1 overflow-hidden flex flex-col">
      <div className="mb-4">
        <Input placeholder="Search menu items..." className="w-full" />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="font-medium capitalize">{category}</h3>
              <div className="space-y-1">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 hover:bg-muted rounded-md cursor-pointer"
                      onClick={() => dispatch(addMenuItem(item))}
                    >
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span>${item.price.toFixed(2)}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
