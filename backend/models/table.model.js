import mongoose from "mongoose";

const rowSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    cost: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const tableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    columns: { type: [String], default: [] }, // new: store column names (e.g. ["Name","Phone","Position","Salary"])
    rows: { type: [rowSchema], default: [] },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
