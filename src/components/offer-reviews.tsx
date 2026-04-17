import { MAX_COMMENTS_COUNT } from '@/const';
import { UserComments } from '@/types/user-comment';
import OfferReviewsItem from './offer-reviews-item';
// import { useAppSelector } from '@/hooks/store-hooks';
// import {
//   selectCommentsStatus,
//   selectFetchCommentsStatusCode,
//   selectPostCommentStatusCode,
// } from '@/store/slices/comments-slice';
// import ErrorPage from './error-page';

interface OfferReviewsProps {
  comments: UserComments;
}

export default function OfferReviews({
  comments,
}: OfferReviewsProps): JSX.Element {
  // const commentStatusCode = useAppSelector(selectCommentsStatus);
  // const fetchCommentsStatusCode = useAppSelector(selectFetchCommentsStatusCode);
  // const postCommentStatusCode = useAppSelector(selectPostCommentStatusCode);
  const sortedComments = comments
    .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_COMMENTS_COUNT);

  // if (commentStatusCode === RequestStatus.Failed) {
  //   if (fetchCommentsStatusCode === 404 || postCommentStatusCode === 404) {
  //     // return <Navigate to={AppRoute.NotFound} />
  //     return <ErrorPage />;
  //   }
  //   return <ErrorPage />;
  // }

  if (sortedComments.length === 0) {
    return (
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">0</span>
      </h2>
    );
  }

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.map((comment, index) => (
          <OfferReviewsItem
            key={comment.id || `comment-${index}`}
            commentItem={comment}
          />
        ))}
      </ul>
    </>
  );
}
