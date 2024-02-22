const { Schema } = require('mongoose');

const orderSchema = new Schema({
    //objectId vs nanoID 협의 후 추후 type결정
    orderNum: {
        type: Number,
        required: true,
    },
    //주문자 id
    orderId: {
        type: String,
        required: true,
    },
    //주문일자
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()+9*60*60*1000
    },
    //배송주소
    orderAddress: {
        type: String,
        required: true,
    },
    //배송 상세주소
    orderDetailAddress: {
        type: String,
        required: true,
    },
    //배송 우편번호
    orderZipCode: {
        type: String,
        required: true,
    },
    //주문자명
    orderName: {
        type: String,
        required: true,
    },
    //주문자 연락처
    orderPhoneNum: {
        type: String,
        required: true,
    },
    //배송요청사항
    orderReq: {
        type: String,
    }
});

module.exports = orderSchema;