import React from 'react'
import { useState } from 'react'

const User = () => {
    let[input,setinput]=useState({username:'',password:''})
    let [data,setdata]=useState([])

    let inputfun=(e)=>{
      let {name,value}=e.target
        setinput({...input,[name]:value})
    }

  let getfun=async()=>{
      let res=await fetch('http://localhost:3000/auth/show')
      let data=await res.json()
      setdata(data)
      console.log(data)
      
  }
  let postfun=async()=>{
    let res=await fetch('http://localhost:3000/auth/insert',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(input)
    })
    let data=await res.json()
    setdata(data)
    console.log(data)
  }
  let deletefun=async(id)=>{
    let res=await fetch(`http://localhost:3000/auth/delete/${id}`,{
        method:'DELETE'
    })
    let data=await res.json()
    setdata(data)
    console.log(data)
  }

  return (
    <div>
      <h1>users component</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam error dignissimos placeat, suscipit quasi blanditiis officiis reprehenderit laborum magnam iusto tempore maxime beatae cumque maiores! Provident porro magni eaque vero.</p>
      <input type="text" name='username' placeholder='enter your name' onChange={inputfun}/>
      <input type="text" name='password' placeholder='enter your password'onChange={inputfun}/>

      <button  onClick={getfun}>getdata</button>
      <button onClick={postfun}>post</button>
     

      <div className="div">
        {
            data.length>0 && data.map((r,i)=>{
                return(
                    <div className="div" key={i} style={{display:'flex',gap:'33px'}}>
                        <p>{r._id}</p>
                        <p>{r.username}</p>
                        <p>{r.password}</p>
                        <button onClick={()=>deletefun(r._id)}>delete</button>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default User
