function json(status, body){return {statusCode:status,headers:{'content-type':'application/json','cache-control':'no-store'},body:JSON.stringify(body)}}
function clean(v){return String(v||'').trim()}
exports.handler=async(event)=>{
  try{
    if(event.httpMethod!=='POST') return json(405,{error:'Method not allowed'});
    const expected=process.env.ADMIN_KEY;
    if(!expected) return json(500,{error:'ADMIN_KEY missing'});
    let body={};
    try{body=JSON.parse(event.body||'{}')}catch{return json(400,{error:'Invalid JSON'})}
    const entered=clean(body.key);
    if(!entered || entered!==expected) return json(401,{error:'Access denied'});
    return json(200,{ok:true});
  }catch(e){
    console.error(e);
    return json(500,{error:e.message||'Function error'});
  }
};
