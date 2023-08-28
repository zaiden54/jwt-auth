import { logoutErrorAction, signAction } from '../features/redux/slices/userSlice';
import { logoutService, signInService, signUpService } from '../services/userService';
import type { UserFormType } from '../types/userTypes';
import { useAppDispatch } from './redux';

type UseAuthType = {
  signUpHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  signInHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  logoutHandler: () => void;
};

const useAuth = (): UseAuthType => {
  const dispatch = useAppDispatch();

  const signUpHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserFormType;

    signUpService(formData)
      .then((data) => dispatch(signAction(data)))
      .catch((err) => console.log(err));
  };

  const signInHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserFormType;
    signInService(formData)
      .then((data) => dispatch(signAction(data)))
      .catch((err) => console.log(err));
  };

  const logoutHandler = (): void => {
    logoutService()
      .then(() => dispatch(logoutErrorAction()))
      .catch(() => dispatch(logoutErrorAction()));
  };

  return {
    signUpHandler,
    signInHandler,
    logoutHandler,
  };
};

export default useAuth;
