var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const axios = require('axios');

var boxSchema = new Schema(
  {
    boxId: {
      type: String,
      unique: true,
    },
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
    locationAddress: String,
    active: {
      type: Boolean,
      default: true,
    },
    dimension: String,
  },
  {
    timestamps: true,
  }
);

boxSchema.pre("save", async function (next) {
  var user = this;
  if(user.location.length != 2) return next();
  else{
    const resp = await axios.get(process.env.POSITIONSTACK_API_URI + `&query=${user.location[0]},${user.location[1]}`);
    let closestAddress = resp.data.data[0].label;
    user.locationAddress = closestAddress;
    next();
  }
});

module.exports = mongoose.model("box", boxSchema);
