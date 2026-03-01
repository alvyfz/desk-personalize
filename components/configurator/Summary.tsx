import { Product } from "@/types/product";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";

interface SummaryProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedDesk: Product | null;
  selectedChair: Product | null;
  selectedMonitor: Product | null;
  monitorCount: number;
  selectedAccessories: Product[];
}

export const Summary = ({
  isOpen,
  onOpenChange,
  selectedDesk,
  selectedChair,
  selectedMonitor,
  monitorCount,
  selectedAccessories,
}: SummaryProps) => {
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Checkout Summary
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                {selectedDesk && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={selectedDesk.thumbnailUrl[0]}
                        alt={selectedDesk.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-bold">{selectedDesk.name}</p>
                        <p className="text-small text-default-500">Desk</p>
                      </div>
                    </div>
                    <p className="font-bold">
                      ${selectedDesk.price.toLocaleString()}
                    </p>
                  </div>
                )}
                {selectedChair && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={selectedChair.thumbnailUrl[0]}
                        alt={selectedChair.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-bold">{selectedChair.name}</p>
                        <p className="text-small text-default-500">Chair</p>
                      </div>
                    </div>
                    <p className="font-bold">
                      ${selectedChair.price.toLocaleString()}
                    </p>
                  </div>
                )}
                {selectedMonitor && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={selectedMonitor.thumbnailUrl[0]}
                        alt={selectedMonitor.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-bold">{selectedMonitor.name}</p>
                        <p className="text-small text-default-500">
                          Monitor (x{monitorCount})
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">
                      ${(selectedMonitor.price * monitorCount).toLocaleString()}
                    </p>
                  </div>
                )}
                {selectedAccessories.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.thumbnailUrl[0]}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-small text-default-500">
                          {item.type || "Accessory"}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">${item.price.toLocaleString()}</p>
                  </div>
                ))}

                <Divider />

                <div className="flex justify-between items-center text-xl font-bold mt-4">
                  <span>Total</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  alert("Proceeding to payment...");
                  onClose();
                }}
              >
                Confirm & Pay
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
