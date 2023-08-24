import { useState, useContext, useEffect } from 'react';

import axios from 'axios';


export default function App() {
  const [datas, setDatas]=useState([]);
  const [newData, setNewData]=useState("");
  const [editData, setEditData]=useState(null);
  const getDatas=async()=>{
    const response = await axios.get('http://localhost:3500/Coupon_foruser/todoList')
    .catch(error => {
      console.log('错误配置：', error.config);
    });
    console.log('response',response)
    setDatas(response?.data)
  }

  const addNew = async()=>{
    const response= await axios.post('http://localhost:3500/Coupon_foruser/todoList',{
      text:newData
    })
    getDatas();
    setNewData('')
  }

  const deleteItem = async(id)=>{
    const response= await axios.delete(`http://localhost:3500/Coupon_foruser/todoList/${id}`,{
      text:newData
    })
    getDatas();
  }

  const saveItem =async()=>{
    const response= await axios.put(`http://localhost:3500/Coupon_foruser/todoList/${editData?.id}`,{
      text:editData.text
    })
    getDatas();
    setEditData(null)
  }

  useEffect(()=>{
    getDatas();
  },[])
  return <>
    <input type="text" value={newData} onChange={(e)=>{setNewData(e.target.value)}} />
    <button type='button' onClick={addNew}>add</button>
    {datas?.map((data)=>{
      return(
        <div key={data?.id}>
          <p>{data?.text}</p>
          <button type='button' onClick={()=>{setEditData({...data})}}>編輯</button>
          <button type='button' onClick={()=>{deleteItem(data?.id)}}>刪除</button>
        </div>
      )
    })}
    {editData?.id && (
      <>
        <input type="text" value={editData.text} onChange={(e)=>{setEditData({...editData, text : e.target.value})}} />
        <button type = 'button' onClick={saveItem}>確認編輯</button>
      </>
    )}
  </>
}
