
/// <reference lib="webworker" />

function init_graph(page:string="Page1",display_results:any,graph_settings:any){
  var filtered:any[]=[];
  var saleData:any=[];
  display_results.forEach((data:any)=>{
  var temp= data.filter((el:any)=>{
       return el.Page==page;
   });
 filtered.push(temp);
  });
  filtered.forEach((arrays:any)=>{
    var temp_array:any[]=[];
     arrays.forEach((array_data:any)=>{
       
         var res=graph_settings.filter((data:any)=>{
               return data.name==array_data.name;
         })
        
         temp_array.push({ name: array_data[res[0].x], value: array_data[res[0].y] });
     });
     saleData.push(temp_array);
  });
  return saleData;
 }

 addEventListener('message', ({ data }) => {
  const response = {response:init_graph(data.page,data.display_results,data.graph_settings)}
  postMessage(response);
});
