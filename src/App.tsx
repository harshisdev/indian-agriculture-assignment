import { useState } from "react";
import { MantineProvider, Button, Container, Title } from "@mantine/core";
import { AggregatedTable } from "./components/Table";
import { BarChart } from "./components/BarChart";
import cropData from "./data/cropsData.json";

function App() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const toggleColorScheme = () =>
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <MantineProvider
      defaultColorScheme="light"
      theme={{ colorScheme }}
      forceColorScheme={colorScheme}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container>
        {/* color change button */}
        <div style={{ textAlign: "end", marginBottom: "1rem" }}>
          <Button
            className="btn-theme"
            onClick={toggleColorScheme}
            mt="md"
            mb="md"
          >
            {colorScheme === "dark" ? "Light" : "Dark"} Mode
          </Button>
        </div>
        {/* heading */}
        <h1 style={{ fontSize: "1.3rem", textAlign: "center" }}>
          Agriculture Summary
        </h1>
        {/* table and chart */}
        <AggregatedTable data={cropData} />
        <div className="chart-container">
          <BarChart data={cropData} />
        </div>
      </Container>
    </MantineProvider>
  );
}

export default App;
