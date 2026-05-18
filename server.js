require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

const path = require("path")
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static((__dirname)))
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/languages", async (req, res) => {
    try {
      const response = await fetch("https://translate.argosopentech.com/languages");
      if (!response.ok) throw new Error("Unavailable");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.warn("API mirror offline.");
      res.json([
        { code: "en", name: "English" },
        { code: "es", name: "Spanish" },
        { code: "fr", name: "French" },
        { code: "de", name: "German" },
        { code: "it", name: "Italian" },
        { code: "pt", name: "Portuguese" },
        { code: "zh", name: "Chinese" },
        { code: "ja", name: "Japanese" },
        { code: "ko", name: "Korean" },
        { code: "ar", name: "Arabic" }
      ]);
    }
  });
app.get("/translate", async (req, res) => {
  try {
    const { q, langpair } = req.query;
    const targetUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${langpair}`;
    
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Translation failed!" });
  }
});

app.post("/saveTranslation", async (req, res) => {
  try {
    const { originalText, translatedText, sourceLanguage, targetLanguage } = req.body;

    await supabase.from("translations").insert([{
      original_text: originalText,
      translated_text: translatedText,
      source_language: sourceLanguage,
      target_language: targetLanguage
    }]);

    res.json({ message: "Translation saved" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save" });
  }
});

app.get("/history", async (req, res) => {
  try {
    const { data } = await supabase.from("translations").select("*");
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to get history" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});