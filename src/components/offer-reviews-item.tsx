import { UserComment } from "@/types/user-comment";
import { getStarActiveWidth } from "@/util";

interface OfferReviewsItemProps {
  commentItem?: UserComment;
}

export default function OfferReviewsItem({ commentItem }: OfferReviewsItemProps) {
  if (!commentItem) {
    return null;
  }

  const { user, comment, date, rating } = commentItem;
  const { avatarUrl, name } = user;

  const roundedRating = Math.round(rating);
  const starActiveWidth: string = getStarActiveWidth(roundedRating);

  const commentDate = new Date(date);
  const formattedDateNumeric = commentDate.toLocaleDateString('sv-SE');
  const formattedDateMonth = commentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: starActiveWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={formattedDateNumeric}>
          {formattedDateMonth}
        </time>
      </div>
    </li>
  );
}
