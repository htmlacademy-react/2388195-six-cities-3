import MemoizedLayout from '@/components/layout';
import Offer from '@/components/offer';
import OfferGallery from '@/components/offer-gallery';
import OfferNearPlaces from '@/components/offer-near-places';
import Spinner from '@/components/spinner/spinner';
import {
  RequestStatus,
  MAX_NEARBY_COUNT,
  MAX_IMAGES_COUNT,
  AppRoute,
} from '@/const';
import {
  useAppSelector,
  useAppDispatch,
  useDocumentTitle,
} from '@/hooks/store-hooks';
import { commentsActions } from '@/store/slices/comments-slice';
import {
  selectOffer,
  selectOfferStatus,
  selectNearbyOffers,
  offerActions,
  selectofferStatusCode,
} from '@/store/slices/offer-slice';
import { fetchOffer, fetchNearby, fetchComments } from '@/store/thunk/offer';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import MemoizedErrorPage from '../error-page/error-page';
import MemoizedCitiesMap from '@/components/cities-map';

export default function OfferPage(): JSX.Element {
  const { id } = useParams();
  const offer = useAppSelector(selectOffer);
  const offerStatus = useAppSelector(selectOfferStatus);
  const offerStatusCode = useAppSelector(selectofferStatusCode);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const dispatch = useAppDispatch();

  useDocumentTitle('Offer page');

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearby(id));
      dispatch(fetchComments(id));
    }

    return () => {
      dispatch(offerActions.clear());
      dispatch(commentsActions.clear());
    };
  }, [id, dispatch]);

  if (
    offerStatus === RequestStatus.Loading ||
    offerStatus === RequestStatus.Idle
  ) {
    return <Spinner />;
  }

  if (offerStatus === RequestStatus.Failed || !offer) {
    if (offerStatusCode === 404) {
      return <Navigate to={AppRoute.NotFound} />;
    }
    return <MemoizedErrorPage />;
  }

  const nearOffer = nearbyOffers.slice(0, MAX_NEARBY_COUNT);
  const { images, city } = offer;
  const imagesToShow = images.slice(0, MAX_IMAGES_COUNT);

  return (
    <MemoizedLayout>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery imagesToShow={imagesToShow} />
          <Offer offer={offer} />
          <MemoizedCitiesMap
            className="offer__map"
            currentOffers={nearOffer}
            currentOffer={offer}
            currentCity={city.name}
          />
        </section>
        <div className="container">
          <OfferNearPlaces nearOffers={nearOffer} />
        </div>
      </main>
    </MemoizedLayout>
  );
}
