import { TComment } from '../types';
import { getStarActiveWidth } from '../util';

type OfferReviewsItemProps = {
  commentItem: TComment;
}

export default function OfferReviewsItem({commentItem}: OfferReviewsItemProps): JSX.Element {
  const {user, comment, date, rating} = commentItem;
  const starActiveWidth: string = getStarActiveWidth(rating);
  const formattedDateNumeric = new Date(date).toLocaleDateString('sv-SE');
  const formattedDateMonth = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: starActiveWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={formattedDateNumeric}>{formattedDateMonth}</time>
      </div>
    </li>
  );
}
