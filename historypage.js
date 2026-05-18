const historyLog = document.getElementById("historyLog");

async function loadHistory() {
  const response = await fetch("/history");
  const data = await response.json();

  historyLog.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "historyCard";
    div.innerHTML = `
      <p>Original: ${item.original_text}</p>
      <p>Translated: ${item.translated_text}</p>
      <p>${item.source_language} → ${item.target_language}</p>
    `;
    historyLog.appendChild(div);
  });

  makeChart(data);
}
function makeChart(data) {
  const counts = {};
  data.forEach(item => {
    if (counts[item.target_language]) {
      counts[item.target_language]++;
    } else {
      counts[item.target_language] = 1;
    }
  });

  const chartCanvas = document.getElementById("analyticsChart");
  new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: "Translations",
        data: Object.values(counts)
      }]
    }
  });
}
loadHistory();