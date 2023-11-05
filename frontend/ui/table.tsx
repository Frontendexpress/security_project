import React from 'react';
import styles from '../styles/table.module.css'; // Import the CSS file for styling
import CustomBtn from './Btn';
interface action{
    click:(id:number)=>any;
    text:string;
    color:string;
}
interface TableProps<T> {
    data: T[];
    Actions?:action[];
    filter?:{
      [d:string]:(e:string)=>React.ReactNode
    }
}

const Table = <T extends Record<string, any>>({ data ,Actions=[],filter={}}: TableProps<T>) => {
  return (
    <table className={styles["custom-table"]}>
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            {Actions.length>0 && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.entries(item).map(([keys,value], index) => {
              if(filter[keys])
              return filter[keys](value)

              return <td key={index} style={{overflow:'hidden',textOverflow:'ellipsis',maxWidth:140}}>{value || value==0?<p style={{maxLines: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",}}>{value}</p>:'-'}</td>
})}
            {Actions.length>0 && 
                <td style={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>
            {Actions.map((d, index) => (
                <CustomBtn text={d.text} textStyle={{color:'white',fontSize:12}} style={{backgroundColor:d.color,width:90,margin:"0 10px",height:32,borderRadius:5}} press={async()=>{
                  await d.click(item.id)
                }}/>))}
                </td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;