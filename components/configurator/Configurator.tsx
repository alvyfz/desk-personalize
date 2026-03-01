"use client";

import { useState } from "react";
import { Product, ProductData } from "@/types/product";
import { ProductSelector } from "./ProductSelector";
import { Canvas } from "./Canvas";
import { Summary } from "./Summary";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

interface ConfiguratorProps {
  data: ProductData;
}

export const Configurator = ({ data }: ConfiguratorProps) => {
  const [selectedDesk, setSelectedDesk] = useState<Product | null>(null);
  const [selectedChair, setSelectedChair] = useState<Product | null>(null);
  const [selectedMonitor, setSelectedMonitor] = useState<Product | null>(null);
  const [monitorCount, setMonitorCount] = useState<number>(1);
  const [selectedAccessories, setSelectedAccessories] = useState<Product[]>([]);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleSelectDesk = (desk: Product) => {
    setSelectedDesk(desk);
  };

  const handleSelectChair = (chair: Product) => {
    setSelectedChair(chair);
  };

  const handleSelectMonitor = (monitor: Product) => {
    if (selectedMonitor?.id === monitor.id) {
      return;
    }
    setSelectedMonitor(monitor);
    setMonitorCount(1);
  };

  const handleMonitorQuantityChange = (count: number) => {
    setMonitorCount(count);
  };

  const handleSelectAccessory = (accessory: Product) => {
    setSelectedAccessories((prev) => {
      if (accessory.type === "keyboard" || accessory.type === "mouse") {
        // Replace existing keyboard/mouse
        const others = prev.filter((p) => p.type !== accessory.type);

        // If clicking the same one, toggle it off? Or just select it?
        // Usually in configurators, clicking again might not toggle off for core items, but for accessories it might.
        // Let's say we replace.
        // Check if already selected
        const isSelected = prev.some((p) => p.id === accessory.id);
        if (isSelected) {
          return prev; // No change if already selected
        }
        return [...others, accessory];
      } else {
        // For 'other' types, toggle behavior
        const isSelected = prev.some((p) => p.id === accessory.id);
        if (isSelected) {
          return prev.filter((p) => p.id !== accessory.id);
        }
        return [...prev, accessory];
      }
    });
  };

  const accessoriesPrice = selectedAccessories.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  const totalPrice =
    (selectedDesk?.price || 0) +
    (selectedChair?.price || 0) +
    (selectedMonitor?.price || 0) * monitorCount +
    accessoriesPrice;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full h-full min-h-[600px] p-2 lg:p-4">
      {/* Left Panel - Product Selector - Order 2 on mobile, Order 1 on desktop */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4 order-2 lg:order-1 pb-20 lg:pb-0">
        <h2 className="text-xl lg:text-2xl font-bold">Select Items</h2>
        {!selectedDesk && (
          <p className="text-small text-default-500">
            Please select a desk to unlock monitors and accessories.
          </p>
        )}
        <ProductSelector
          data={data}
          selectedDesk={selectedDesk}
          selectedChair={selectedChair}
          selectedMonitor={selectedMonitor}
          monitorCount={monitorCount}
          selectedAccessories={selectedAccessories}
          onSelectDesk={handleSelectDesk}
          onSelectChair={handleSelectChair}
          onSelectMonitor={handleSelectMonitor}
          onMonitorQuantityChange={handleMonitorQuantityChange}
          onSelectAccessory={handleSelectAccessory}
        />
      </div>

      {/* Center/Right Panel - Canvas and Summary - Order 1 on mobile, Order 2 on desktop */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4 relative order-1 lg:order-2">
        <h2 className="text-xl lg:text-2xl font-bold text-center lg:text-left">
          Preview
        </h2>
        <Canvas
          selectedDesk={selectedDesk}
          selectedChair={selectedChair}
          selectedMonitor={selectedMonitor}
          monitorCount={monitorCount}
          selectedAccessories={selectedAccessories}
        />

        {/* Desktop Button */}
        <div className="hidden lg:flex justify-center mt-4">
          <Button
            color="primary"
            size="lg"
            className="w-full max-w-md font-bold text-lg shadow-lg"
            onPress={onOpen}
            isDisabled={
              !selectedDesk &&
              !selectedChair &&
              !selectedMonitor &&
              selectedAccessories.length === 0
            }
          >
            Ready to Rent?
          </Button>
        </div>

        {/* Mobile Sticky Footer */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-divider p-4 z-50 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col">
            <span className="text-xs text-default-500">Total Price</span>
            <span className="font-bold text-lg text-primary">
              ${totalPrice.toLocaleString()}
            </span>
          </div>
          <Button
            color="primary"
            size="md"
            className="font-bold shadow-md"
            onPress={onOpen}
            isDisabled={
              !selectedDesk &&
              !selectedChair &&
              !selectedMonitor &&
              selectedAccessories.length === 0
            }
          >
            Checkout
          </Button>
        </div>

        <Summary
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedDesk={selectedDesk}
          selectedChair={selectedChair}
          selectedMonitor={selectedMonitor}
          monitorCount={monitorCount}
          selectedAccessories={selectedAccessories}
        />
      </div>
    </div>
  );
};
