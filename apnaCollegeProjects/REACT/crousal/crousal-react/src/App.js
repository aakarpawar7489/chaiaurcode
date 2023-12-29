import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Carousel from "react-elastic-carousel"

function App() {
  const [data,setData]=useState([]);
  const [pageNo,setPageNo]=useState(1);
  const [que,setQue]=useState("nature");
  const [classDiv,setClassdiv]=useState("");
  const[curImg,setCurImg]=useState({});


  const pages = [
    {
      label:"1",
      value:1
    },
    {
      label:"2",
      value:2
    },
    {
      label:"3",
      value:3
    },
    {
      label:"4",
      value:4
    }
  ];
  const query=[
    {
      label:"Nature",
      value:"nature"
    },
    {
      label:"Tree",
      value:"tree"
    },
    {
      label:"Birds",
      value:"birds"
    },
    {
      label:"Flower",
      value:"flower"
    }
  ];
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ]
  useEffect(()=>{
    
    const URL=`https://api.unsplash.com/search/photos?page=${pageNo}&query=${que}&client_id=U2pS9emdUJKHneIjaV0wWW0xL9_U7K5gK7PPNNTGKt8`;
    
    axios.get(URL).then((res)=>{
     setData(res.data.results);
     setCurImg(res.data.results[0]);
    })
  },[que,pageNo])

  const handleClick=(image)=>{
   setCurImg(image);
   setClassdiv("border");
  }
  const handleQuery=(e)=>{
    setQue(e.target.value)
  }
  const handlePage=(e)=>{
    setPageNo(e.target.value)
  }
  console.log();
  

  return (
  <div className="App">
    <div className="headingImage">IMAGE VIEWER</div>
    <div className="mainImage">
    <img src={curImg?.urls?.small} alt={curImg?.id} />
    </div>
    <div className="imageViewer">
      <div className="selected">
      <select onChange={handleQuery}>
       {query.map((q)=>(
        <option value={q.value}>{q.label}</option>
       ))}
      </select>
      <select onChange={handlePage}>
       {pages.map((p)=>(
         <option value={p.value}>{p.label}</option>
       ))}
      </select>
      </div>
      <Carousel breakPoints={breakPoints}>
        {data.map((image)=>(
        
          <img src={image?.urls?.small} alt={image?.id} key={image?.id} onClick={()=>handleClick(image)} className={curImg?.id===image?.id? "border":""}/>
        ))}
        
        </Carousel>

      

    </div>
    

  </div>)
}

export default App;