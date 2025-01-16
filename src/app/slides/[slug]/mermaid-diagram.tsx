"use client";

import mermaid from "mermaid";
import { useEffect, useRef } from "react";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  themeVariables: {
    fontFamily: "ui-monospace, monospace",
    fontSize: "14px",
    primaryColor: "#ff0000",
    primaryTextColor: "#fff",
    primaryBorderColor: "#fff",
    lineColor: "#F8B229",
    secondaryColor: "#006100",
    tertiaryColor: "#fff",
    background: "#1e1e1e",
  },
});

interface MermaidProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (elementRef.current) {
        elementRef.current.innerHTML = "";
        try {
          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart);
          if (elementRef.current) {
            elementRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid rendering error:", error);
          elementRef.current.innerHTML = `<pre>${chart}</pre>`;
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div
      ref={elementRef}
      className="mermaid-wrapper flex justify-center my-4"
    />
  );
}
