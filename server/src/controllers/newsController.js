// controllers/newsController.js
import News from "../models/newsModel.js";
import path from "path";
import fs from "fs";

// GET all news
export const getNews = async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
};

// POST new news
export const createNews = async (req, res) => {
  const { title, description, author } = req.body;
  const image = `/uploads/${req.file.filename}`;

  const newNews = new News({ title, description, author, image });
  await newNews.save();
  res.status(201).json(newNews);
};

// PUT update news
export const updateNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ error: "News not found" });

  const { title, description, author } = req.body;
  let imagePath = news.image;

  if (req.file) {
    // delete old image
    fs.unlinkSync(`./public${news.image}`);
    imagePath = `/uploads/${req.file.filename}`;
  }

  news.title = title;
  news.description = description;
  news.author = author;
  news.image = imagePath;

  await news.save();
  res.json(news);
};

// DELETE news
export const deleteNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ error: "News not found" });

  fs.unlinkSync(`./public${news.image}`);
  await news.deleteOne();

  res.json({ message: "News deleted" });
};


// GET news by ID
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
