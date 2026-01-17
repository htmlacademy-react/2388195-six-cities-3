import {Link} from 'react-router-dom';
import { AppRoute } from '../const';
import { TListOffer } from '../types';
import { getStarActiveWidth } from '../util';

type PlaceCardProp = {
  listOffer: TListOffer;
  handleHover: (listOffer?: TListOffer) => void;
}

export default function PlaceCard({listOffer, handleHover}: PlaceCardProp): JSX.Element {
  const handleMouseOn = () => {
    handleHover(listOffer);
  };

  const handleMouseOff = () => {
    handleHover();
  };

  const {id, isPremium, previewImage, price, title, type, rating} = listOffer;
  const starActiveWidth: string = getStarActiveWidth(rating);

  return (
    <Link to={`${AppRoute.Offer}/${id}`}>
      <article
        className="cities__card place-card"
        onMouseEnter={handleMouseOn}
        onMouseLeave={handleMouseOff}
      >
        <div className="place-card__mark">
          <span>{isPremium}</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: starActiveWidth}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </Link>
  );
}
