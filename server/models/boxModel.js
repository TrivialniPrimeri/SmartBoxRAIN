var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var boxSchema = new Schema(
  {
    boxId: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    nickname: String,
    authorizedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      {
        type: Date,
      },
    ],
    location: [Number],
    active: Boolean,
    dimension: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("box", boxSchema);
