import {
  MIN_REVIEW_RATING,
  RATING,
  ReviewLength,
  TIMEOUT_SHOW_ERROR,
} from '@/const';
import { useAppDispatch } from '@/hooks/store-hooks';
import { postComment } from '@/store/thunk/offer';
import {
  ReactEventHandler,
  useState,
  FormEvent,
  Fragment,
  useEffect,
} from 'react';
import '@/components/offer-rewiews/offer-rewiews.css';

interface OfferFormProps {
  offerId: string;
}
type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export default function OfferForm({ offerId }: OfferFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [review, setReview] = useState({
    rating: MIN_REVIEW_RATING,
    review: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isSubmitDisabled =
    isSubmitting ||
    review.review.length < ReviewLength.Min ||
    review.rating === MIN_REVIEW_RATING ||
    review.review.length > ReviewLength.Max;

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, TIMEOUT_SHOW_ERROR);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage]);

  const handleChange: ChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');

    const prevRating = Number(review.rating);
    const prevReview = review.review;

    dispatch(
      postComment({
        body: {
          comment: prevReview,
          rating: prevRating,
        },
        offerId,
      }),
    )
      .unwrap()
      .then(() => {
        setReview({ rating: MIN_REVIEW_RATING, review: '' });
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Failed to send review. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
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
              disabled={isSubmitting}
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
        disabled={isSubmitting}
      ></textarea>
      {errorMessage && <p className="reviews__error">{errorMessage}</p>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount"> {ReviewLength.Min} characters</b>
          .
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
