import { memo } from "react";

function FavouriteEmpty(): JSX.Element {
  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">
          Save properties to narrow down search or plan your future trips.
        </p>
      </div>
    </section>
  );
}


const MemoizedFavouriteEmpty = memo(FavouriteEmpty);
export default MemoizedFavouriteEmpty;
