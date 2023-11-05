import { LogsApi } from "@/API/logs";
import colors from "@/constant/colors";
import Card from "@/ui/card"
import Table from "@/ui/table"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading";

export default function Home() {
  const [data,setdata]=useState([])
  const[loading,setloading]=useState<boolean>(true)
  const api=async(skip=0)=>{
    setloading(true)
    const data=await LogsApi.get_logs()
    if(data?.status==200){
      setdata(data?.data)
    }
    setloading(false)
  }
  useEffect(()=>{
    api()
  },[])
  return (
    <>
    <div style={{display:'flex',justifyContent:'center'}}>
    <Card title={'logs Table'} description={`can see all logs`} width={1100}>
      {loading && <ReactLoading type="spin" color={colors.primary_color} width={20} height={20} />}
      <br/>
      <Table data={data}/>

    </Card>
    </div>
    </>
  )
}
