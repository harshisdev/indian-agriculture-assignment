import { Table } from "@mantine/core";

interface CropRecord {
  year: number;
  crop: string;
  production: number;
}

interface AggregatedRow {
  year: number;
  maxCrop: string;
  minCrop: string;
}

export function AggregatedTable({ data }: { data: CropRecord[] }) {
  const years = Array.from(new Set(data.map((d) => d.year)));
  const aggregated: AggregatedRow[] = years.map((year) => {
    const yearData = data.filter((d) => d.year === year);
    const sorted = [...yearData].sort((a, b) => a.production - b.production);
    return {
      year,
      minCrop: sorted[0]?.crop ?? "N/A",
      maxCrop: sorted[sorted.length - 1]?.crop ?? "N/A",
    };
  });

  return (
    <Table className="aggregated-table" striped>
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production in that Year</th>
          <th>Crop with Minimum Production in that Year</th>
        </tr>
      </thead>
      <tbody>
        {aggregated.map((row) => (
          <tr key={row.year}>
            <td>{row.year}</td>
            <td>{row.maxCrop}</td>
            <td>{row.minCrop}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
