exports.handler = async (event, context) => {
  const country = context?.geo?.country?.code || event.headers['x-nf-country'] || event.headers['cf-ipcountry'] || '';
  return {statusCode:200,headers:{'content-type':'application/json','cache-control':'no-store'},body:JSON.stringify({country})};
};
