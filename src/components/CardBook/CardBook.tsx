import React from "react";
import styles from "./CardBook.module.scss";

interface CardBookProps {
  author: string;
  title: string;
  img: string;
  category: string;
}

function CardBook({ author, title, img, category }: CardBookProps) {
  const imgUrl = { backgroundImage: `url(${img})` };

  return (
    <div className={styles.card}>
      <div className={styles.card_img} style={imgUrl}></div>

      <div className={styles.card_info}>
        <p className={styles.card_title}>{title}</p>

        <div className={styles.card_desc}>
          <p className={styles.card_author}>
            <span className={styles.card_span}>Author:</span> {author}
          </p>
          <p className={styles.card_category}>
            <span className={styles.card_span}>Category:</span> {category}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardBook;
