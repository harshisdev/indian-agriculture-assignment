import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useMantineColorScheme } from "@mantine/core";

interface CropRecord {
  crop: string;
  production: number;
}

export function BarChart({ data }: { data: CropRecord[] }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const cropMap: Record<string, number[]> = {};
    data.forEach((d) => {
      if (!cropMap[d.crop]) cropMap[d.crop] = [];
      cropMap[d.crop].push(d.production);
    });

    const crops = Object.keys(cropMap);
    const avgProduction = crops.map((crop) => {
      const values = cropMap[crop];
      const sum = values.reduce((a, b) => a + b, 0);
      return sum / values.length;
    });

    // Initialize the chart
    const chart = echarts.init(chartRef.current!);

    // Chart options
    const options = {
      title: {
        text: "Average Crop Production",
        left: "center",
        top: "5%",
        textStyle: {
          fontSize: 16,
          color: colorScheme === "dark" ? "#ffffff" : "#333333",
        },
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#ffffff",
        textStyle: {
          color: colorScheme === "dark" ? "#ffffff" : "#000000",
        },
        formatter: function (params: any) {
          const items = params.map((item: any) => {
            return `Production: ${Math.round(item.data)}`;
          });
          return `Crop: ${params[0].name}<br/>${items.join("<br/>")}`;
        },
      },
      xAxis: {
        type: "category",
        data: crops,
        axisLabel: {
          color: colorScheme === "dark" ? "#cccccc" : "#333333",
          rotate: 45,
        },
        axisLine: {
          lineStyle: {
            color: colorScheme === "dark" ? "#555" : "#ccc",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: colorScheme === "dark" ? "#cccccc" : "#333333",
        },
        axisLine: {
          lineStyle: {
            color: colorScheme === "dark" ? "#555" : "#ccc",
          },
        },
        splitLine: {
          lineStyle: {
            color: colorScheme === "dark" ? "#333" : "#eee",
          },
        },
      },
      series: [
        {
          data: avgProduction,
          type: "bar",
          barWidth: 15,
          itemStyle: {
            color: colorScheme === "dark" ? "#ddd" : "#ccc",
            borderColor: colorScheme === "dark" ? "#555" : "#ccc",
          },
        },
      ],
      backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#ffffff",
    };

    // Set chart options
    chart.setOption(options);

    // Handle window resize
    const handleResize = () => {
      chart.resize();
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, colorScheme]);

  // Return chart container
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
}
