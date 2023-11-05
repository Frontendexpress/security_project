import React, { ReactNode } from 'react';
import styles from '../styles/card.module.css';

interface CardProps{
    title: string;
    children:ReactNode;
    description:string;
    width:number;
}


const Card = ({ title, children ,description,width}:CardProps) => {
  return (
    <div className={styles["card"]} style={{width:width}}>
      <div className={styles["card-header"]}>
      <div className={styles["line"]}></div>
        <div className={styles["title"]}>{title}</div>
      </div>
      <p className={styles["description"]}>{description}</p>
      <div className={styles["card-content"]}>{children}</div>
    </div>
  );
};

export default Card;