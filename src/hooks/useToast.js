import { useDispatch } from 'react-redux';
import { addToast, removeToast } from '../features/toast/toastSlice';

export const useToast = () => {
  const dispatch = useDispatch();

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    dispatch(addToast({ id, message, type }));
    setTimeout(() => dispatch(removeToast(id)), 3500);
  };

  return { showToast };
};