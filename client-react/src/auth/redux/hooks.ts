import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/types';

const useAppDispatch = () => useDispatch<AppDispatch>(); //represents type of dispatch function from store
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //will mirror the entire current state of store

export { useAppDispatch, useAppSelector };