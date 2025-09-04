const FONT_COLOR = "#073B4C";
const GRID_COLOR = "#d1d5db";
const PALETTE = {
  red: "#FF6B6B",
  yellow: "#FFD166",
  green: "#06D6A0",
  blue: "#118AB2",
  darkBlue: "#073B4C",
};

function processLabels(labels) {
  const maxLen = 16;
  return labels.map((label) => {
    if (label.length <= maxLen) return label;
    let parts = [];
    let currentLine = "";
    const words = label.split(" ");
    for (const word of words) {
      if ((currentLine + " " + word).length > maxLen) {
        parts.push(currentLine);
        currentLine = word;
      } else {
        currentLine = currentLine ? currentLine + " " + word : word;
      }
    }
    parts.push(currentLine);
    return parts;
  });
}

const tooltipTitleCallback = (tooltipItems) => {
  const item = tooltipItems[0];
  let label = item.chart.data.labels[item.dataIndex];
  return Array.isArray(label) ? label.join(" ") : label;
};

const SHARED_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: FONT_COLOR,
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      callbacks: {
        title: tooltipTitleCallback,
      },
    },
  },
  scales: {
    y: {
      ticks: { color: FONT_COLOR },
      grid: { color: GRID_COLOR },
    },
    x: {
      ticks: { color: FONT_COLOR },
      grid: { color: "transparent" },
    },
  },
};

new Chart(document.getElementById("emissionsChart"), {
  type: "doughnut",
  data: {
    labels: ["Ganadería", "Transporte Global", "Otros Sectores"],
    datasets: [
      {
        label: "Emisiones de GEI (%)",
        data: [14.5, 14, 71.5],
        backgroundColor: [PALETTE.red, PALETTE.yellow, "#e5e7eb"],
        borderColor: "#f0f4f8",
        borderWidth: 4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: FONT_COLOR, font: { size: 14 } },
      },
      tooltip: {
        callbacks: {
          title: tooltipTitleCallback,
        },
      },
    },
  },
});

new Chart(document.getElementById("resourceChart"), {
  type: "bar",
  data: {
    labels: ["Agua (Litros/kg)", "Tierra (m²/kg)"],
    datasets: [
      {
        label: "Carne de Res",
        data: [15415, 50],
        backgroundColor: PALETTE.blue,
        borderColor: PALETTE.darkBlue,
        borderWidth: 1,
      },
      {
        label: "Lentejas",
        data: [2500, 1],
        backgroundColor: PALETTE.green,
        borderColor: PALETTE.darkBlue,
        borderWidth: 1,
      },
    ],
  },
  options: { ...SHARED_CHART_OPTIONS },
});

new Chart(document.getElementById("antibioticsChart"), {
  type: "pie",
  data: {
    labels: ["Uso en Ganadería", "Uso en Humanos"],
    datasets: [
      {
        label: "% de Antibióticos Vendidos",
        data: [80, 20],
        backgroundColor: [PALETTE.red, PALETTE.blue],
        borderColor: "#f0f4f8",
        borderWidth: 4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: FONT_COLOR, font: { size: 14 } },
      },
      tooltip: {
        callbacks: {
          title: tooltipTitleCallback,
        },
      },
    },
  },
});
