import CitiesMap from '@/components/cities-map';
import Layout from '@/components/layout';
import Offer from '@/components/offer';
import OfferGallery from '@/components/offer-gallery';
import OfferNearPlaces from '@/components/offer-near-places';
import Spinner from '@/components/spinner/spinner';
import { RequestStatus, MAX_NEARBY_COUNT, MAX_IMAGES_COUNT } from '@/const';
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
} from '@/store/slices/offer-slice';
import { fetchOffer, fetchNearby, fetchComments } from '@/store/thunk/offer';
import { CityName } from '@/types/offer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';

interface OfferPageProps {
  randomCity: CityName;
}

export default function OfferPage({ randomCity }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const offer = useAppSelector(selectOffer);
  const offerStatus = useAppSelector(selectOfferStatus);
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

  if (offerStatus === RequestStatus.Loading) {
    return <Spinner />;
  }

  if (offerStatus === RequestStatus.Failed || !offer) {
    return <NotFoundPage type="offer" randomCity={randomCity} />;
  }

  const nearOffer = nearbyOffers.slice(0, MAX_NEARBY_COUNT);
  const nearOffersWithCurrent = [...nearOffer, offer];
  const { images, city } = offer;
  const imagesToShow = images.slice(0, MAX_IMAGES_COUNT);

  return (
    <Layout>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery imagesToShow={imagesToShow} />
          <Offer offer={offer} />
          <CitiesMap
            className="offer__map"
            currentOffers={nearOffersWithCurrent}
            currentCity={city.name}
          />
        </section>
        <div className="container">
          <OfferNearPlaces nearOffers={nearOffer} />
        </div>
      </main>
    </Layout>
  );
}
