import { useAppSelector } from '@/hooks/store-hooks';
import { useAuth } from '@/hooks/user-auth-hook';
import { selectComments } from '@/store/slices/comments-slice';
import { FullOffer } from '@/types/offer';
import { getStarActiveWidth } from '@/util';
import FavoriteButton from './favorite-button';
import OfferForm from './offer-form';
import OfferReviews from './offer-reviews';

interface OfferProps {
  offer: FullOffer;
}

export default function Offer({ offer }: OfferProps): JSX.Element {
  const comments = useAppSelector(selectComments);
  const isAuth = useAuth();

  const {
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    id: offerId,
    isFavorite,
  } = offer;

  const roundedRating = Math.round(rating);
  const starActiveWidth: string = getStarActiveWidth(roundedRating);

  const formatedType = (formatType: string): string =>
    formatType ? formatType[0].toUpperCase() + formatType.slice(1) : '';

  const formatedBedrooms = (count: number): string =>
    `${count} ${count > 1 ? 'Bedrooms' : 'Bedroom'}`;

  const formatedAdults = (count: number): string => `${count} ${count > 1 ? 'adults' : 'adult'}`;

  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {isPremium && (
          <div className="offer__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="offer__name-wrapper">
          <h1 className="offer__name">{title}</h1>
          <FavoriteButton buttonType={'offer'} offerId={offerId} isFavorite={isFavorite} />
        </div>
        <div className="offer__rating rating">
          <div className="offer__stars rating__stars">
            <span style={{ width: starActiveWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="offer__rating-value rating__value">{roundedRating}</span>
        </div>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">{formatedType(type)}</li>
          <li className="offer__feature offer__feature--bedrooms">{formatedBedrooms(bedrooms)}</li>
          <li className="offer__feature offer__feature--adults">Max {formatedAdults(maxAdults)}</li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">&euro;{price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            {goods.map((good) => (
              <li key={good} className="offer__inside-item">
                {good}
              </li>
            ))}
          </ul>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
              <img
                className="offer__avatar user__avatar"
                src={host.avatarUrl}
                width="74"
                height="74"
                alt="Host avatar"
              />
            </div>
            <span className="offer__user-name">{host.name}</span>
            <span className="offer__user-status">{host.isPro && 'Pro'}</span>
          </div>
          <div className="offer__description">
            <p className="offer__text">{description}</p>
          </div>
        </div>
        <section className="offer__reviews reviews">
          <OfferReviews comments={comments} />
          {isAuth && <OfferForm offerId={offerId} />}
        </section>
      </div>
    </div>
  );
}
