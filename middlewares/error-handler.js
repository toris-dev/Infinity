module.exports =  (err, req, res, next)=> {
    console.log(err);
    res.status(err.status || 500).send(`에러가 발생하였습니다. 관리자에게 문의해주세요. <br> ${err}`);
};
