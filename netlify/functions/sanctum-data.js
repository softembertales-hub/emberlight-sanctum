const { getStore } = require('@netlify/blobs');
const fs = require('fs');
const path = require('path');
const STORE_NAME='emberlight-sanctum';
const KEY='sanctum-state-v51';
const LEGACY_KEY='sanctum-state-v31';
function json(status,body){return{statusCode:status,headers:{'content-type':'application/json','cache-control':'no-store'},body:JSON.stringify(body)}}
function store(){const siteID=process.env.NETLIFY_SITE_ID;const token=process.env.NETLIFY_AUTH_TOKEN||process.env.NETLIFY_BLOBS_TOKEN;if(!siteID||!token)throw new Error('Netlify Blobs credentials missing. Set NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN.');return getStore({name:STORE_NAME,siteID,token});}
exports.handler=async(event)=>{try{const s=store(); if(event.httpMethod==='GET'){const saved=await s.get(KEY,{type:'json'}); if(saved)return json(200,saved); const legacy=await s.get(LEGACY_KEY,{type:'json'}); if(legacy)return json(200,legacy); const fallback=JSON.parse(fs.readFileSync(path.join(process.cwd(),'data/default-state.json'),'utf8')); return json(200,fallback);} if(event.httpMethod==='POST'){const expected=process.env.ADMIN_KEY; if(!expected)return json(500,{error:'ADMIN_KEY missing'}); if(event.headers['x-admin-key']!==expected)return json(401,{error:'Invalid admin key'}); const data=JSON.parse(event.body||'{}'); data.updatedAt=new Date().toISOString(); await s.setJSON(KEY,data); await s.setJSON(LEGACY_KEY,data); return json(200,{ok:true,updatedAt:data.updatedAt});} return json(405,{error:'Method not allowed'});}catch(e){console.error(e);return json(500,{error:e.message||'Function error'});}};
