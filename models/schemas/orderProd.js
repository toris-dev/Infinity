const { Schema, default: mongoose } = require('mongoose');
// mongoose.Types.ObjectId

const orderProdSchema = new Schema({
  prodNum: {
    type: Schema.Types.ObjectId,
    required: true
  },
  orderProdCount: {
    type: Number,
    required: true
  }
});

module.exports = orderProdSchema;
