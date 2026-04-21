import { AppRoute } from '@/const';
import { useAppDispatch } from '@/hooks/store-hooks';
import { ListOffer } from '@/types/offer';
import { getStarActiveWidth, formattedType } from '@/util';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import FavoriteButton from './favorite-button';
import { appActions } from '@/store/slices/app-slice';

interface PlaceCardProps {
  currentOffer: ListOffer;
  cardType: 'favorites' | 'cities' | 'near-places';
  hovered?: boolean;
}

const sizes = {
  favorites: {
    width: 150,
    height: 110,
  },
  cities: {
    width: 260,
    height: 200,
  },
  'near-places': {
    width: 260,
    height: 200,
  },
};

export default function PlaceCard({
  currentOffer,
  cardType,
  hovered,
}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    id,
    isPremium,
    previewImage,
    price,
    title,
    type,
    rating,
    isFavorite,
  } = currentOffer;
  const roundedRating = Math.round(rating);
  const starActiveWidth = getStarActiveWidth(roundedRating);
  const { width, height } = sizes[cardType];

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={() => hovered && dispatch(appActions.setActiveId(id))}
      onMouseLeave={() => hovered && dispatch(appActions.setActiveId(null))}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <Link to={`${AppRoute.Offer}/${id}`}>
        <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </div>
      </Link>
      <div
        className={classNames(
          'place-card__info',
          cardType === 'favorites' && 'favorites__card-info',
        )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            buttonType={'place-card'}
            offerId={id}
            isFavorite={isFavorite}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: starActiveWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{formattedType(type)}</p>
      </div>
    </article>
  );
}
