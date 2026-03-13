// import { useEffect } from 'react';

// import { RequestStatus } from '../const';
// import { useAppDispatch, useAppSelector } from './store-hooks';
// import { selectFavoriteOffers, selectFavoriteOffersStatus } from '../store/slices/favorite-slice';
// import { fetchFavorites } from '../store/thunk/favorite';


// export function useFavoriteCount() {
//   const status = useAppSelector(selectFavoriteOffersStatus);
//   const count = useAppSelector(selectFavoriteOffers).length;

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (status === RequestStatus.Idle) {
//       dispatch(fetchFavorites());
//     }
//   }, [dispatch, status]);

//   return count;
// }

