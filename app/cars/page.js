import { prisma } from "@/lib/prisma";

export default async function CarsPage() {
  const cars = await prisma.car.findMany();

  return (
    <div className="flex flex-1 flex-col gap-4 bg-zinc-50 p-8 dark:bg-black">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
        Cars
      </h1>

      <table className="w-full text-left text-sm text-black dark:text-zinc-50">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10">
            <th className="py-2">Name</th>
            <th className="py-2">Plate Number</th>
            <th className="py-2">Year</th>
            <th className="py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="border-b border-black/5 dark:border-white/5">
              <td className="py-2">{car.car_name}</td>
              <td className="py-2">{car.car_platNum}</td>
              <td className="py-2">{car.car_year}</td>
              <td className="py-2">{car.car_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
