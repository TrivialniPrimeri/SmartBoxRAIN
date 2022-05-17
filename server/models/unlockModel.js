var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var unlockSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    success: Boolean,
    boxId: {
      type: Schema.Types.ObjectId,
      ref: "box",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("unlock", unlockSchema);
