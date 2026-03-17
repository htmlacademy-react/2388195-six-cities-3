import {Link} from 'react-router-dom';

import { AppRoute } from '../const';
import { getStarActiveWidth } from '../util';
import { useAppDispatch } from '../hooks/store-hooks';
import { offersActions } from '../store/slices/offers-slice';
import { ListOffer } from '../types/offer';
import FavoriteButton from './favorite-button';

interface PlaceCardProps {
  currentOffer: ListOffer;
  block: 'favorites' | 'place-card' | 'cities' | 'near-places';
  hovered?: boolean;
}

export default function PlaceCard({currentOffer, block, hovered}: PlaceCardProps): JSX.Element {

  const dispatch = useAppDispatch();

  const {id, isPremium, previewImage, price, title, type, rating, isFavorite} = currentOffer;
  const roundedRating = Math.round(rating);
  const starActiveWidth: string = getStarActiveWidth(roundedRating);

  const imgWidth = block === 'favorites' ? '150' : '260';
  const imgHeight = block === 'favorites' ? '110' : '200';

  return (
    <Link to={`${AppRoute.Offer}/${id}`}>
      <article
        className={`${block}__card place-card`}
        onMouseEnter={() => hovered && dispatch(offersActions.setActiveId(id))}
        onMouseLeave={() =>hovered && dispatch(offersActions.setActiveId(null))}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className={`${block}__image-wrapper place-card__image-wrapper`}>
          <img className="place-card__image" src={previewImage} width={imgWidth} height={imgHeight} alt="Place image"/>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <FavoriteButton block={'place-card'} offerId={id} isFavorite={isFavorite} />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: starActiveWidth}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {title}
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </Link>
  );
}


////////////////////////////////////////////////////////////////////////
// onMouseEnter={() => hovered && dispatch(offersActions.setActiveId(id))}
// onMouseLeave={() =>hovered && dispatch(offersActions.setActiveId(null))}

// Использование стрелочной функции в данном контексте объясняется:
//   1. Отложенное выполнение
// Если написать onMouseEnter={dispatch(...)},
// то функция dispatch выполнится мгновенно при рендеринге компонента.
// Обертывание в стрелочную функцию () => ... создает «заготовку»,
// которая сработает только в момент реального события (когда пользователь наведет курсор на карточку).
//   2. Передача параметров
// Стрелочная функция позволяет передать конкретные аргументы в экшен,
// такие как id или null. Без анонимной функции было бы невозможно указать,
// какой именно ID должен отправиться в Redux,
// не создавая отдельную именованную функцию-обработчик выше в коде.
//   3. Логика на месте (inline-условие)
// В коде используется проверка условия hovered && ....
// Стрелочная функция позволяет компактно описать эту логику прямо в атрибуте компонента:
// действие выполнится только в том случае, если пропс hovered имеет значение true.
//   4.  Замыкание (Closure)
// Стрелочная функция имеет доступ к переменным из области видимости компонента,
// таким как id, hovered, dispatch и offersActions.
// Это позволяет коду внутри функции «видеть» актуальные
// значения этих переменных без дополнительных сложностей.
