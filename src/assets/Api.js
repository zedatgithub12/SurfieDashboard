

var Api = "";
var headers ={
    accept: "application/json",
    "Content-Type": "application/json"
};
const data = {
    // the data to be sent to server will be encoded here 
}
// The featching resource from api process start from the API below
// 
fetch(Api,{
    method: "POST",
    headers:headers,
    body: JSON.stringify(data),
})
.then((response) => response.json())
.then((response)=>{

    if(response.status === "200"){
        //the manipulation goes here...
    }
})
.catch((e)=>{
    // the error will be caught here 
    //console.log(e);
});