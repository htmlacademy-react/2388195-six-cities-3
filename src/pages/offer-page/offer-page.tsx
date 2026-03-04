import OfferForm from '../../components/offer-form';
import OfferImage from '../../components/offer-image';
import OfferNearPlaces from '../../components/offer-near-places';
import OfferReviews from '../../components/offer-reviews';
import { AuthorizationStatus, CityName, RequestStatus } from '../../const';
// import { Offers, Offer, UserComments, ListOffer } from '../../types';
import { getStarActiveWidth } from '../../util';
import NotFoundPage from '../not-found-page/not-found-page';
import CitiesMap from '../../components/cities-map/cities-map';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
// import { selectActiveId, selectOffers } from '../../store/slices/offers-slice';
import { useParams } from 'react-router-dom';
// import { useDocumentTitle } from '../../hooks/store-hooks';
import { selectOffer, selectOfferStatus, selectNearbyOffers } from '../../store/slices/offer-slice';
import { selectComments } from '../../store/slices/comments-slice';
import { fetchComments, fetchNearby, fetchOffer } from '../../store/thunk/offers';
import { useEffect } from 'react';
import { selectActiveId } from '../../store/slices/offers-slice';

interface OfferPageProps {
  authorizationStatus: AuthorizationStatus;
  randomCity: CityName;
}

export default function OfferPage({authorizationStatus, randomCity}: OfferPageProps): JSX.Element {

  //Зачем:
  // useDocumentTitle('Offer');
  // const id = useAppSelector(selectActiveId);
  const {id} = useParams();
  //useParams() возвращает объект с параметрами, а не строку
  //Деструктуризация параметра: const { id } = useParams(); - извлекает конкретный параметр id из объекта параметров.

  const offer = useAppSelector(selectOffer);
  const offerStatus = useAppSelector(selectOfferStatus);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const comments = useAppSelector(selectComments);
  const activeOfferId = useAppSelector(selectActiveId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      Promise.all(
        [dispatch(fetchOffer(id)), dispatch(fetchNearby(id)), dispatch(fetchComments(id))]
      );
    }
  }, [dispatch, id]);
  //[dispatch, id] - Массив зависимостей (выполняется при изменении зависимостей):
  // Перенос в useEffect: Вызовы dispatch должны быть внутри useEffect,
  // иначе они будут выполняться при каждом рендере компонента, что может привести к бесконечным запросам.

  //Promise.all - чтобы эти промисы отработали одновременно. (избежать лишний ререндер)

  if (offerStatus === RequestStatus.Loading) {
    return <div>Loading...</div>;
  }

  if (offerStatus === RequestStatus.Failed || !offer) {
    return <NotFoundPage type='offer' randomCity={randomCity} />;
  }
  // const currentOffer = offers.find((offer: Offer) => offer.id === id);
  // const listOffers = useAppSelector(selectOffers);

  // if (!currentOffer) {
  //   return <NotFoundPage type='offer' randomCity={randomCity} />;
  // }

  // const currentListOffer = listOffers.find((listOffer: ListOffer) => listOffer.id === id);

  // if (!currentListOffer) {
  //   return <NotFoundPage type='offer' randomCity={randomCity} />;
  // }

  // const currentCity = offer.city.name;

  // const nearOffers = getNearOffers(listOffers, currentCity, id);
  const nearOffersWithCurrent = [...nearbyOffers, offer];

  const {images, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description, city} = offer;
  const isAuth: boolean = authorizationStatus === AuthorizationStatus.Auth;
  const starActiveWidth: string = getStarActiveWidth(rating);


  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images.map((image) => (
              <OfferImage image={image} key={image}/>)
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium &&
            <div className="offer__mark">
              <span>Premium</span>
            </div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: starActiveWidth}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {type ? type[0].toUpperCase() + type.slice(1) : ''}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms > 1 ? `${bedrooms} Bedrooms` : `${bedrooms} Bedroom`}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {maxAdults > 1 ? `${maxAdults} adults` : `${maxAdults} adult`}
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
                  </li>)
                )}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="offer__user-name">
                  {host.name}
                </span>
                <span className="offer__user-status">
                  {host.isPro && 'Pro'}
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <OfferReviews comments={comments}/>
              {isAuth && <OfferForm />}
            </section>
          </div>
        </div>
        <CitiesMap className='offer__map' currentOffers={nearOffersWithCurrent} currentCity={city.name} activeOfferId={activeOfferId} />
      </section>
      <div className="container">
        <OfferNearPlaces nearOffers={nearbyOffers} />
      </div>
    </main>
  );
}
