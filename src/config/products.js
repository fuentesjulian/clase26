import mongoose from "mongoose";

export const prodCollection = "products";

export const prodSchema = new mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String
});