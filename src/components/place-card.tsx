import {Link} from 'react-router-dom';
import { AppRoute } from '../const';
import { getStarActiveWidth } from '../util';
import { useAppDispatch } from '../hooks/store-hooks';
import { offersActions } from '../store/slices/offers-slice';
import { ListOffer } from '../types/offer';
// import { useEffect } from 'react';

// type CardProps = ServerOffer &
//   Pick<React.ComponentPropsWithoutRef<'article'>, 'onMouseEnter' | 'onMouseLeave'> & {
//     environment: 'cities' | 'favorites' | 'near-places';
//     hovered?: boolean;
//   };
// На изображении представлено описание типа CardProps в TypeScript, который используется
// для типизации пропсов компонента карточки.
// Этот тип создается путем объединения нескольких интерфейсов и типов с помощью оператора пересечения (&).

// Первая часть ServerOffer указывает, что объект должен содержать все поля, описывающие предложение (оффер),
// полученное с сервера.

// Вторая часть использует служебный тип Pick.
// Она выбирает только два конкретных обработчика событий — onMouseEnter и onMouseLeave —
// из стандартных пропсов HTML-элемента <article>. Это позволяет передавать в
// компонент функции для отслеживания наведения курсора мыши.

// Третья часть добавляет обязательное поле environment. Его значение строго ограничено литеральным типом:
//  это может быть только одна из трех строк: 'cities', 'favorites' или 'near-places'.
//  Это поле, скорее всего, отвечает за контекст отображения карточки, чтобы менять её
//  стили или логику в зависимости от того, где она находится (на главной, в избранном или в списке похожих мест).

// Последняя часть добавляет необязательное поле hovered с логическим типом (boolean).
// Знак вопроса перед двоеточием означает, что это свойство можно не передавать.
// Оно может использоваться для визуального выделения карточки программным способом.

interface PlaceCardProps {
  currentOffer: ListOffer;
  // handleHover?: (currentOffer?: ListOffer) => void;
  block: string;
  hovered?: boolean;
}

export default function PlaceCard({currentOffer, block, hovered}: PlaceCardProps): JSX.Element {
  // const handleMouseOn = () => {
  //   handleHover?.(currentOffer);
  // };

  // const handleMouseOff = () => {
  //   handleHover?.();
  // };

  //  const { setActiveId } = useActionCreators(offersActions);
  //   На изображении показана строка кода на JavaScript (или TypeScript),
  //   использующая React-хук для работы с библиотекой управления состоянием Redux.

  // В этой строке вызывается кастомный хук useActionCreators(offersActions).
  // Его задача — взять набор экшенов offersActions и автоматически обернуть их в функцию dispatch.
  // Это позволяет вызывать экшены как обычные функции, не используя dispatch(setActiveId(id)) каждый раз вручную.

  // С помощью деструктуризации объекта из результата выполнения хука извлекается функция setActiveId.
  // Она предназначена для обновления ID активного элемента (например, предложения по аренде или товара)
  // в глобальном состоянии приложения. Теперь setActiveId можно вызвать напрямую в компоненте,
  // чтобы отправить новое значение в Redux.

  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(offersActions.setActiveId(currentOffer ? currentOffer.id : null));
  // });

  const {id, isPremium, previewImage, price, title, type, rating} = currentOffer;
  const starActiveWidth: string = getStarActiveWidth(rating);

  //ЧТО ЭТО?
  // const imgWidth = block === 'favorites' ? '150' : '260';
  // const imgHeight = block === 'favorites' ? '110' : '200';

  return (
    <Link to={`${AppRoute.Offer}/${id}`}>
      <article
        className={`${block}__card place-card`}
        // onMouseEnter={handleMouseOn}
        // onMouseLeave={handleMouseOff}
        onMouseEnter={() => hovered && dispatch(offersActions.setActiveId(id))}
        onMouseLeave={() =>hovered && dispatch(offersActions.setActiveId(null))}
        // onMouseLeave={() =>hovered && dispatch(offersActions.setActiveId(undefined))}

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
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className={`${block}__image-wrapper place-card__image-wrapper`}>
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
            {title}
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </Link>
  );
}
