import React from 'react'
import { fetchUserData , showError } from "./Action"
import reducer from './Reducer'
import axios from "axios"
import {thunk} from 'redux-thunk'
import {createStore , applyMiddleware} from "redux"

const store = createStore(reducer , applyMiddleware(thunk))

const fetchData = () => async() =>{
    try{
        let data = await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(data.data)
        store.dispatch(fetchUserData(data.data))
    }catch (error){
        store.dispatch(showError(error))
    }
}



const DisplayData = () => {

    const [showData , setshowData] = React.useState(false)
    const [data , setData] = React.useState([])

    let handleClick = () =>{
        store.dispatch(fetchData())
        setshowData(!showData)
    }

    React.useEffect(()=>{
        let subscribeFunc = store.subscribe(()=>{setData(store.getState().users)})
        return subscribeFunc
    } , [])    

  return (
    <>
      <button onClick={handleClick}>{showData ? "Hide" : "Show"}</button>
        <div>
            {showData && data.map((ele , i)=>{
                return (<div key={i} className='card'>
                            <h3>{ele.name}</h3>
                            <h4>{ele.email}</h4>
                        </div>)
            })}
        </div>

    </>
  )
}

export default DisplayData