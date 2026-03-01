import { Configurator } from "@/components/configurator/Configurator";
import { ProductData } from "@/types/product";
import { promises as fs } from "fs";
import path from "path";

async function getData() {
  const filePath = path.join(process.cwd(), "public", "product-list.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as ProductData;
}

export default async function Home() {
  const data = await getData();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full max-w-7xl mx-auto px-4">
      <div className="w-full h-full text-center">
        <h1 className="text-4xl font-bold mb-4">Design Your Workspace</h1>
        <p className="text-lg text-default-500 mb-8">
          Create your perfect setup with our interactive configurator.
        </p>

        <Configurator data={data} />
      </div>
    </section>
  );
}
