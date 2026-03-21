import { FormEvent, Fragment, ReactEventHandler, useState } from 'react';
import { RATING } from '../const';
import { useAppDispatch } from '../hooks/store-hooks';
import { postComment } from '../store/thunk/offer';

interface OfferFormProps {
  offerId: string;
}
type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export default function OfferForm({ offerId }: OfferFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [review, setReview] = useState({ rating: 0, review: '' });

  let isSubmitDisabled =
    review.review.length < 50 || review.rating === 0 || review.review.length > 300;
  const handleChange: ChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setReview({
      ...review,
      [name]: value,
    });
    isSubmitDisabled = false;
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      postComment({
        body: {
          comment: review.review,
          rating: Number(review.rating),
        },
        offerId,
      }),
    );
    setReview({ rating: 0, review: '' });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING.map(({ value, label }) => (
          <Fragment key={label}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={Number(review.rating) === value}
              onChange={handleChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.review}
        onChange={handleChange}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount"> 50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
