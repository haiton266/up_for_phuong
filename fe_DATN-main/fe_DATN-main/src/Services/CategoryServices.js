import axios from './axios-customize'
const apikey = 'tttn';
const ShowCategory =()=>
{
   return  axios.get(`/${apikey}/category`);
}
const Categorylimit10 =()=>
{
   return  axios.get(`/${apikey}/product/limit10`);
}
const GetCategoryByID =(id)=>
{
   return axios.get(`/${apikey}/category/${id}`, { });
}
const PostCategory =(name,icon )=>
   {
      return  axios.post(`/${apikey}/category`,{name,icon});
   }
/////////////////

export{ShowCategory,Categorylimit10,GetCategoryByID,PostCategory};