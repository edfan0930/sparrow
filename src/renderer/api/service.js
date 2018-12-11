import { Get } from './instance';
import router from './router';

export default {
  /**
   * Login
   * @param { Object } Obj
   * @property { account }
   * @property { password }
   */
  Login: Obj => Get(router.LOGIN, Obj),
};
