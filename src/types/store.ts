import {store} from '../store/index.ts';

export type TRootState = ReturnType<typeof store.getState>;
//выводит тип возвращаемого значения функциию. getState - вернет всё состояние

export type TAppDispatch = typeof store.dispatch;
