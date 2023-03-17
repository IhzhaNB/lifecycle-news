import React from "react";
import "./lcn.css";

const Cards = ({ article }) => {
  return (
    <div class="card" key={article.title}>
      <img class="image" src={article.image} />
      <div class="content">
        <h3 class="title">{article.title}</h3>

        <p class="desc">{article.description}</p>

        <a href={article.url} class="action">
          Show Detail
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
};

export default Cards;
