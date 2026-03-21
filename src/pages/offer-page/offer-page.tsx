import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import OfferForm from '../../components/offer-form';
import OfferImage from '../../components/offer-image';
import OfferNearPlaces from '../../components/offer-near-places';
import OfferReviews from '../../components/offer-reviews';
import { MAX_IMAGES_COUNT, MAX_NEARBY_COUNT, RequestStatus } from '../../const';
import { getStarActiveWidth } from '../../util';
import NotFoundPage from '../not-found-page/not-found-page';
import CitiesMap from '../../components/cities-map/cities-map';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import {
  selectOffer,
  selectOfferStatus,
  selectNearbyOffers,
  offerActions,
} from '../../store/slices/offer-slice';
import { commentsActions, selectComments } from '../../store/slices/comments-slice';
import { fetchComments, fetchNearby, fetchOffer } from '../../store/thunk/offer';
import { useAuth } from '../../hooks/user-auth-hook';
import FavoriteButton from '../../components/favorite-button';
import Spinner from '../../components/spinner/spinner';
import { CityName } from '../../types/offer';
interface OfferPageProps {
  randomCity: CityName;
}

export default function OfferPage({ randomCity }: OfferPageProps): JSX.Element {
  const { id } = useParams();

  const offer = useAppSelector(selectOffer);
  const offerStatus = useAppSelector(selectOfferStatus);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const comments = useAppSelector(selectComments);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearby(id));
      dispatch(fetchComments(id));
    }

    return () => {
      dispatch(offerActions.clear()); //очистка перед уходом
      dispatch(commentsActions.clear());
    };
  }, [id, dispatch]);

  const isAuth = useAuth();

  if (offerStatus === RequestStatus.Loading || !offer) {
    return <Spinner />;
  }

  if (offerStatus === RequestStatus.Failed || !offer) {
    return <NotFoundPage type="offer" randomCity={randomCity} />;
  }

  const nearOffer = nearbyOffers.slice(0, MAX_NEARBY_COUNT);
  const nearOffersWithCurrent = [...nearOffer, offer];

  const {
    images,
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
    city,
    id: offerId,
    isFavorite,
  } = offer;

  const imagesToShow = images.slice(0, MAX_IMAGES_COUNT);

  const roundedRating = Math.round(rating);
  const starActiveWidth: string = getStarActiveWidth(roundedRating);

  const formatedType = (formatType: string): string =>
    formatType ? formatType[0].toUpperCase() + formatType.slice(1) : '';

  const formatedBedrooms = (count: number): string =>
    `${count} ${count > 1 ? 'Bedrooms' : 'Bedroom'}`;

  const formatedAdults = (count: number): string => `${count} ${count > 1 ? 'adults' : 'adult'}`;

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {imagesToShow.map((image) => (
              <OfferImage key={image} image={image} />
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <FavoriteButton block={'offer'} offerId={offerId} isFavorite={isFavorite} />
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
              <li className="offer__feature offer__feature--bedrooms">
                {formatedBedrooms(bedrooms)}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {formatedAdults(maxAdults)}
              </li>
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
        <CitiesMap
          className="offer__map"
          currentOffers={nearOffersWithCurrent}
          currentCity={city.name}
          activeOfferId={offerId}
        />
      </section>
      <div className="container">
        <OfferNearPlaces nearOffers={nearOffer} />
      </div>
    </main>
  );
}

//useParams() возвращает объект с параметрами, а не строку
//Деструктуризация параметра: const { id } = useParams(); - извлекает конкретный параметр id из объекта параметров.

//[dispatch, id] - Массив зависимостей (выполняется при изменении зависимостей):
// Перенос в useEffect: Вызовы dispatch должны быть внутри useEffect,
// иначе они будут выполняться при каждом рендере компонента, что может привести к бесконечным запросам.

//   Promise.all(
//     [dispatch(fetchOffer(id)),
//       dispatch(fetchNearby(id)),
//       dispatch(fetchComments(id))]
//   );
//Promise.all - чтобы эти промисы отработали одновременно. (избежать лишний ререндер)

// useDocumentTitle('Offer');
// const id = useAppSelector(selectActiveId);
