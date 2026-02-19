import { Comments } from '../types';
import OfferReviewsItem from './offer-reviews-item';

type OfferReviewsProps = {
  comments: Comments;
}

export default function OfferReviews({comments}: OfferReviewsProps): JSX.Element {
  const commentsNumber = comments.length;
  return (
    <>
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{commentsNumber}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) =>
          <OfferReviewsItem key={comment.id} commentItem={comment}/>
        )}
      </ul>
    </>
  );
}
