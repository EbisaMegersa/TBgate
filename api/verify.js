const {
receipt,
utils:{
loadReceipt,
parseFromHTML
}
} = require("telebirr-receipt");

module.exports = async (req,res)=>{

try{

const { amount, receipt:receiptNo } =
req.body;

const html =
await loadReceipt({
receiptNo
});

const parsed =
parseFromHTML(html);

const verify =
receipt(parsed,{
amount
});

const result =
verify.verifyAll();

if(result){

return res.status(200).json({
success:true,
message:"✅ Payment Accepted"
});
}

return res.status(400).json({
success:false,
message:"❌ Payment Rejected"
});

}catch(e){

return res.status(500).json({
success:false,
message:"Verification Error"
});

}
};