import { Product, ProductData } from "@/types/product";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import clsx from "clsx";

interface ProductSelectorProps {
  data: ProductData;
  selectedDesk: Product | null;
  selectedChair: Product | null;
  selectedMonitor: Product | null;
  monitorCount: number;
  selectedAccessories: Product[];
  onSelectDesk: (desk: Product) => void;
  onSelectChair: (chair: Product) => void;
  onSelectMonitor: (monitor: Product) => void;
  onMonitorQuantityChange: (count: number) => void;
  onSelectAccessory: (accessory: Product) => void;
}

export const ProductSelector = ({
  data,
  selectedDesk,
  selectedChair,
  selectedMonitor,
  monitorCount,
  selectedAccessories,
  onSelectDesk,
  onSelectChair,
  onSelectMonitor,
  onMonitorQuantityChange,
  onSelectAccessory,
}: ProductSelectorProps) => {
  return (
    <div className="flex w-full flex-col h-full">
      <Tabs
        aria-label="Options"
        className="flex-1"
        color="primary"
        variant="underlined"
      >
        <Tab key="desks" title="Desks" className="h-full">
          <div className="grid grid-cols-2 gap-4 p-2 overflow-y-auto max-h-[300px] lg:max-h-[500px]">
            {data.desks.map((desk) => (
              <Card
                key={desk.id}
                isPressable
                onPress={() => onSelectDesk(desk)}
                className={clsx(
                  "border-2 w-full",
                  selectedDesk?.id === desk.id
                    ? "border-primary"
                    : "border-transparent",
                )}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={desk.name}
                    className="w-full object-cover h-[100px] lg:h-[140px]"
                    src={desk.thumbnailUrl[0]}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between flex-col lg:flex-row items-start lg:items-center">
                  <b className="truncate mr-2 w-full lg:w-auto">{desk.name}</b>
                  <p className="text-default-500 whitespace-nowrap">
                    ${desk.price.toLocaleString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tab>
        <Tab key="chairs" title="Chairs" className="h-full">
          <div className="grid grid-cols-2 gap-4 p-2 overflow-y-auto max-h-[300px] lg:max-h-[500px]">
            {data.chairs.map((chair) => (
              <Card
                key={chair.id}
                isPressable
                onPress={() => onSelectChair(chair)}
                className={clsx(
                  "border-2 w-full",
                  selectedChair?.id === chair.id
                    ? "border-primary"
                    : "border-transparent",
                )}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={chair.name}
                    className="w-full object-cover h-[100px] lg:h-[140px]"
                    src={chair.thumbnailUrl[0]}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between flex-col lg:flex-row items-start lg:items-center">
                  <b className="truncate mr-2 w-full lg:w-auto">{chair.name}</b>
                  <p className="text-default-500 whitespace-nowrap">
                    ${chair.price.toLocaleString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tab>
        <Tab
          key="monitors"
          title="Monitors"
          className="h-full"
          isDisabled={!selectedDesk}
        >
          <div className="grid grid-cols-2 gap-4 p-2 overflow-y-auto max-h-[300px] lg:max-h-[500px]">
            {data.monitors.map((item) => {
              const isSelected = selectedMonitor?.id === item.id;
              return (
                <Card
                  key={item.id}
                  isPressable
                  onPress={() => onSelectMonitor(item)}
                  className={clsx(
                    "border-2 w-full",
                    isSelected ? "border-primary" : "border-transparent",
                  )}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.name}
                      className="w-full object-cover h-[100px] lg:h-[140px]"
                      src={item.thumbnailUrl[0]}
                    />
                  </CardBody>
                  <CardFooter className="flex-col items-start gap-2">
                    <div className="flex flex-col lg:flex-row justify-between w-full">
                      <b className="truncate mr-2 text-small w-full lg:w-auto">
                        {item.name}
                      </b>
                      <p className="text-default-500 text-small whitespace-nowrap">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="flex gap-2 w-full justify-center pt-2 flex-wrap">
                        {Array.from({ length: item.maxCount || 1 }).map(
                          (_, i) => {
                            const count = i + 1;
                            return (
                              <Button
                                key={count}
                                size="md"
                                color={
                                  monitorCount === count ? "primary" : "default"
                                }
                                variant={
                                  monitorCount === count ? "solid" : "flat"
                                }
                                isIconOnly
                                className="min-w-10 w-10 h-10"
                                onPress={(e) => {
                                  onMonitorQuantityChange(count);
                                }}
                              >
                                {count}
                              </Button>
                            );
                          },
                        )}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Tab>
        <Tab
          key="accessories"
          title="Accessories"
          className="h-full"
          isDisabled={!selectedDesk}
        >
          <div className="grid grid-cols-2 gap-4 p-2 overflow-y-auto max-h-[300px] lg:max-h-[500px]">
            {data.accessories?.map((item) => {
              const isSelected = selectedAccessories.some(
                (a) => a.id === item.id,
              );
              return (
                <Card
                  key={item.id}
                  isPressable
                  onPress={() => onSelectAccessory(item)}
                  className={clsx(
                    "border-2 w-full",
                    isSelected ? "border-primary" : "border-transparent",
                  )}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.name}
                      className="w-full object-cover h-[100px] lg:h-[140px]"
                      src={item.thumbnailUrl[0]}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between flex-col lg:flex-row items-start lg:items-center">
                    <b className="truncate mr-2 w-full lg:w-auto">
                      {item.name}
                    </b>
                    <p className="text-default-500 whitespace-nowrap">
                      ${item.price.toLocaleString()}
                    </p>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
