import {copy, linkIcon, loader} from '../assets';
import { useState , useEffect} from 'react';
import { useLazyGetSummaryQuery } from '../services/article';

function Demo() {
  
    const [article,setArticle] = useState({
        url:'',
        summary:''
    })
    const [allArticles, setAllArticles] = useState([]);

    const [getSummary,{error,isFetching}]= useLazyGetSummaryQuery()

    
    useEffect(()=>{
     const articleLocalStorage = JSON.parse(
        localStorage.getItem('articles')
      )
      if(articleLocalStorage){
        setAllArticles(articleLocalStorage);
      }
    },[])

   const  handleSumit = async(e)=>{
    e.preventDefault();
    const {data} = await getSummary({articleUrl:article.url})
    if(data?.summary){
        const newArticle = {...article,summary:data.summary};
        setArticle(newArticle);
      
        const updatedAllArticles = [newArticle,...allArticles]
        setAllArticles(updatedAllArticles);
        localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
    }
    

    }
  
  return (
    <section className='mx-w-xl w-full'>
       <div className=' w-full justify-center gap-2 ' >
       
         <form className='relative flex  justify-center items-center '
         onSubmit={handleSumit}>
            <img src={linkIcon} alt='link_icon' 
            className='absolute left-0 my-2 ml-3 w-5'/>
            <input type='url'placeholder='Paste the URL'
            className='url_input peer'
            value={article.url}
             onChange={(e)=>setArticle({...article,url:e.target.value})} required/>
            <button type='submit'
            className='submit_btn px-5 
            peer-focus:border-gray-700          
            peer-focus:text-gray-700'>Enter</button>  
           </form>
           <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
  {allArticles.map((item, index) => (
    <div key={`link-${index}`}
      onClick={() => setArticle(item)}
      className='link_card'>
      <div className='copy_btn'>
        <img src={copy} alt="copy_item"
          className='w-[40%] h-[40%] object-contain' />
      </div>
      <p className='flex-1
        font-satoshi text-blue-700
        font-medium text-sm truncate'>{item.url}</p>
    </div>
  ))}
</div>
     <div className='my-10 max-w-full flex justify-center '>
        {isFetching?(
          <img src={loader} alt='loader_img'
          className='w-20 h-20 object-contain'/>
        ):error ?(
          <>
          <p className='font-inter font-bold text-black text center'>
            That was not supposed to happen</p>
          <span className='font-satoshi text-gray-700 font-normal'>{error?.data?.error}</span>
         </>
        ):(
           article.summary && (
             <div className='flex flex-col gap-3'>
              <h2 className='text-xl font-satoshi
                   font-bold text-gray-500'>Article 
                   <span className='blue_gradient'> Summary</span>
              </h2>
              <div className='summary_box'>
               <p className='font-inter
                font-gray-700 font-medium'>{article.summary}</p>
              </div>
           </div>
           )
           )
        
        }
     </div>
     </div>
    </section>
  )
}

export default Demo