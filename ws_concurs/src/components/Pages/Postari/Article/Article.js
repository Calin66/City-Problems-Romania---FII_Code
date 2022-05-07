import React from "react";
import "./article.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";

const Article = ({ imgUrl, date, titlu, categorie }) => (
  <div className="gpt3blog-container_article">
    <div className="afp-ct">
      <h4>{categorie}</h4>
    </div>
    <div className="gpt3blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="gpt3__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{titlu}</h3>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <p>Vezi postare</p>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <BiUpvote className="cp-vote" />
          <BiDownvote className="cp-vote" />
        </div>
      </div>
    </div>
  </div>
);

export default Article;
