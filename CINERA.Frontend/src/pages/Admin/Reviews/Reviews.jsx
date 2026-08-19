import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { getReviews, deleteReview } from "../../../services/admin";

import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // LOAD REVIEWS
  // ==============================

  useEffect(() => {
    const fetchReviewsData = async () => {
      setLoading(true);
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (err) {
        setError("Failed to load reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewsData();
  }, []);

  // ==============================
  // DELETE REVIEW
  // ==============================

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete review.");
    }
  };

  // ==============================
  // FILTER REVIEWS
  // ==============================

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const text =
        `${review.userName || ""} ${
          review.movieTitle || ""
        } ${
          review.comment || ""
        }`.toLowerCase();

      const matchesSearch =
        text.includes(
          search.toLowerCase()
        );

      const rating =
        Number(review.rating || 0);

      const matchesFilter =
        filter === "all" ||
        (filter === "positive" &&
          rating >= 4) ||
        (filter === "negative" &&
          rating < 4);

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [reviews, search, filter]);

  // ==============================
  // STATISTICS
  // ==============================

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total +
              Number(
                review.rating || 0
              ),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const positiveReviews =
    reviews.filter(
      (review) =>
        Number(review.rating || 0) >= 4
    ).length;

  return (
    <main className="admin-reviews">

      <div className="reviews-container">

        {/* ============================== */}
        {/* HEADER */}
        {/* ============================== */}

        <section className="reviews-header">

          <div>

            <p className="reviews-label">
              CINERA ADMIN
            </p>

            <h1>
              Reviews
            </h1>

            <p>
              Manage user reviews and ratings
              across CINERA.
            </p>

          </div>

          <div className="reviews-count">

            <MessageSquare size={18} />

            <span>
              {reviews.length} reviews
            </span>

          </div>

        </section>

        {/* ============================== */}
        {/* STATS */}
        {/* ============================== */}

        <section className="reviews-stats">

          <div className="review-stat">

            <div className="review-stat-icon">
              <MessageSquare size={20} />
            </div>

            <div>

              <span>
                TOTAL REVIEWS
              </span>

              <strong>
                {reviews.length}
              </strong>

            </div>

          </div>

          <div className="review-stat">

            <div className="review-stat-icon">
              <Star size={20} />
            </div>

            <div>

              <span>
                AVERAGE RATING
              </span>

              <strong>
                {averageRating}
              </strong>

            </div>

          </div>

          <div className="review-stat">

            <div className="review-stat-icon">
              <Star size={20} />
            </div>

            <div>

              <span>
                POSITIVE REVIEWS
              </span>

              <strong>
                {positiveReviews}
              </strong>

            </div>

          </div>

        </section>

        {/* ============================== */}
        {/* CONTROLS */}
        {/* ============================== */}

        <section className="reviews-controls">

          <div className="reviews-search">

            <Search size={19} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search reviews..."
            />

          </div>

          <div className="reviews-filters">

            <button
              className={
                filter === "all"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter("all")
              }
            >
              All
            </button>

            <button
              className={
                filter === "positive"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter("positive")
              }
            >
              Positive
            </button>

            <button
              className={
                filter === "negative"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter("negative")
              }
            >
              Low Rated
            </button>

          </div>

        </section>

        {/* ============================== */}
        {/* REVIEWS LIST */}
        {/* ============================== */}

        {filteredReviews.length > 0 ? (

          <section className="reviews-list">

            {filteredReviews.map(
              (review) => (

                <article
                  className="review-card"
                  key={review.id}
                >

                  <div className="review-top">

                    <div className="review-user">

                      <div className="review-avatar">

                        {(review.userName ||
                          "U")
                          .charAt(0)
                          .toUpperCase()}

                      </div>

                      <div>

                        <strong>
                          {review.userName ||
                            "CINERA User"}
                        </strong>

                        <span>
                          {review.date ||
                            "Recently"}
                        </span>

                      </div>

                    </div>

                    <button
                      className="review-delete"
                      onClick={() =>
                        handleDelete(
                          review.id
                        )
                      }
                      title="Delete review"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <div className="review-movie">

                    <span>
                      REVIEW FOR
                    </span>

                    <strong>
                      {review.movieTitle ||
                        "Unknown Movie"}
                    </strong>

                  </div>

                  <div className="review-rating">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <Star
                          key={star}
                          size={16}
                          fill={
                            star <=
                            Number(
                              review.rating ||
                                0
                            )
                              ? "currentColor"
                              : "none"
                          }
                        />

                      )
                    )}

                    <span>
                      {Number(
                        review.rating || 0
                      ).toFixed(1)}
                    </span>

                  </div>

                  <p className="review-comment">
                    {review.comment ||
                      "No comment provided."}
                  </p>

                </article>

              )
            )}

          </section>

        ) : (

          <section className="reviews-empty">

            <MessageSquare size={42} />

            <h2>
              No reviews found
            </h2>

            <p>
              There are no reviews matching
              your current filters.
            </p>

          </section>

        )}

      </div>

    </main>
  );
};

export default Reviews;