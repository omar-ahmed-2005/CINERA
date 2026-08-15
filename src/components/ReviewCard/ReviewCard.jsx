import React from "react";
import { Star } from "lucide-react";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <article className="review-card">
      <div className="review-header">
        <div className="review-user">
          <div className="review-avatar">
            {review.username.charAt(0)}
          </div>

          <div>
            <h4>{review.username}</h4>

            <div className="review-rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  fill={index < review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p>{review.comment}</p>
    </article>
  );
};

export default ReviewCard;