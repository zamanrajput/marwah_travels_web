import { useEffect } from "react";
import {  useNavigation,useNavigate } from "react-router-dom"

export default function Login(){

    const history = useNavigate();

    useEffect(()=>{
        history('/dashboard/home');
    },[])



   return(<div className="w-full flex bg-white">hello</div>) 
}