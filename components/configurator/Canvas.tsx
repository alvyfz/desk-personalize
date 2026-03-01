import { Product } from "@/types/product";
import clsx from "clsx";

interface CanvasProps {
  selectedDesk: Product | null;
  selectedChair: Product | null;
  selectedMonitor: Product | null;
  monitorCount: number;
  selectedAccessories: Product[];
}

export const Canvas = ({
  selectedDesk,
  selectedChair,
  selectedMonitor,
  monitorCount,
  selectedAccessories,
}: CanvasProps) => {
  const getPositionStyle = (
    item: Product & { type: string; index: number; total: number },
  ) => {
    if (item.type === "desk") {
      return { top: "25%", left: "15%", height: "80%" };
    }
    if (item.type === "chair") {
      return { top: "35%", left: "10%", height: "70%" };
    }
    if (item.type === "monitor") {
      const baseTop = 35;
      let left = 30;

      if (item.total === 1) {
        left = 35;
      } else if (item.total === 2) {
        left = 22 + item.index * 22; // 22, 38
      } else if (item.total === 3) {
        left = 14 + item.index * 22; // 14, 30, 46
      }

      return { top: `${baseTop}%`, left: `${left}%`, height: "20%" };
    }
    if (item.type === "keyboard") {
      return { top: "56%", left: "40%", width: "15%", zIndex: 25 };
    }
    if (item.type === "mouse") {
      return { top: "55%", left: "55%", width: "4%", zIndex: 25 };
    }
    if (item.type === "other") {
      return { top: "48%", left: "65%", width: "10%", zIndex: 25 };
    }
    return {};
  };

  const deskItems = selectedDesk
    ? [{ ...selectedDesk, type: "desk", index: 0, total: 1 }]
    : [];
  const chairItems = selectedChair
    ? [{ ...selectedChair, type: "chair", index: 0, total: 1 }]
    : [];

  const monitorItems = selectedMonitor
    ? Array.from({ length: monitorCount }).map((_, i) => ({
        ...selectedMonitor,
        type: "monitor",
        index: i,
        total: monitorCount,
      }))
    : [];

  const accessoryItems = selectedAccessories.map((acc, i) => ({
    ...acc,
    type: acc.type || "other",
    index: i,
    total: selectedAccessories.length,
  }));

  const allItems = [
    ...deskItems,
    ...chairItems,
    ...monitorItems,
    ...accessoryItems,
  ].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] bg-default-100 rounded-xl overflow-hidden border-2 border-dashed border-default-300 shadow-inner">
      {/* Background Image */}
      <img
        src="/assets/background.png"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {!selectedDesk && !selectedChair && !selectedMonitor && (
          <div className="text-center text-default-600 bg-white/50 p-6 rounded-xl backdrop-blur-sm">
            <p className="text-2xl font-bold mb-2">Design Your Workspace!</p>
            <p>— Create Your Perfect Setup! —</p>
          </div>
        )}
      </div>

      {allItems.map((item) => {
        const style = getPositionStyle(item);
        return (
          <img
            key={`${item.id}-${item.type}-${item.index}`}
            src={item.canvasUrl}
            alt={item.name}
            className="absolute transition-all duration-500 ease-in-out hover:scale-105"
            style={{
              zIndex: item.zIndex,
              ...style,
            }}
          />
        );
      })}
    </div>
  );
};
