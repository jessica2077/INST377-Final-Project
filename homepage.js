let translatedText = "";

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const translateButton = document.getElementById("translateButton");
const saveButton = document.getElementById("saveButton");
const result = document.getElementById("result");
const textInput = document.getElementById("textInput");

async function loadLanguages() {
  const response = await fetch("/languages");
  const data = await response.json();

  data.forEach(lang => {
    const option1 = document.createElement("option");
    option1.value = lang.code;
    option1.textContent = lang.name;
    sourceLanguage.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = lang.code;
    option2.textContent = lang.name;
    targetLanguage.appendChild(option2);
  });
}

translateButton.addEventListener("click", async () => {
  const text = textInput.value;
  const source = sourceLanguage.value;
  const target = targetLanguage.value;
  const response = await fetch(`/translate?q=${encodeURIComponent(text)}&langpair=${source}|${target}`);
  const data = await response.json();

  translatedText = data.responseData.translatedText;
  result.innerHTML = translatedText;
});

saveButton.addEventListener("click", async () => {
  const original = textInput.value;

  await fetch("/saveTranslation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      originalText: original,
      translatedText: translatedText,
      sourceLanguage: sourceLanguage.value,
      targetLanguage: targetLanguage.value
    })
  });

  alert("Translation Saved");
});
loadLanguages();