import Table from "../models/table.model.js";
import mongoose from "mongoose";

export const getTables = async (req, res) => {
  try {
    const tables = await Table.find({});
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    console.error("Error fetching tables:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTable = async (req, res) => {
  const payload = req.body;
  // require name and columns array
  if (
    !payload ||
    !payload.name ||
    !Array.isArray(payload.columns) ||
    payload.columns.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Table name and columns are required (columns as array)",
    });
  }

  try {
    const table = new Table(payload);
    await table.save();
    res.status(201).json({ success: true, data: table });
  } catch (error) {
    console.error("Error creating table:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTable = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Table Id" });
  }
  try {
    const updated = await Table.findByIdAndUpdate(id, payload, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating table:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteTable = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Table Id" });
  }
  try {
    await Table.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Table deleted" });
  } catch (error) {
    console.error("Error deleting table:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
