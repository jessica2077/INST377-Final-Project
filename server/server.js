require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/languages", async (req, res) => {
  try {
    const response = await fetch("https://translate.argosopentech.com/languages");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch language!" });
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