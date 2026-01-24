// src/components/ReviewList.tsx
import {Review} from '../types/types';
import ReviewComponent from './Review.tsx';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
          Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </ul>
    </section>

  );
}

export default ReviewsList;
