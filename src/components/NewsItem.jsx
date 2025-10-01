import React, { useState } from "react";
import Chatbot from "./Chatbot";

const NewsItem = (props) => {
  const { id,title, description, image, newsUrl, author, date, source } = props;
  const [showChat, setShowChat] = useState(false);

  const newsContext = `${title}. ${description}. Source: ${source}, Author: ${author}, Date: ${new Date(date).toGMTString()}`;

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>

        <img
          src={
            !image
              ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
              : image
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
          <button
            className="btn btn-sm btn-primary mx-2"
            onClick={() => setShowChat(true)}
          >
            Ask AI
          </button>
        </div>
      </div>

      {showChat && <Chatbot id={id} context={newsContext} onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default NewsItem;
