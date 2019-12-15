import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const authHook = (history) => {
  const user = cookies.get('CURR_USER');
  if(user){
    history.push('/');
  }
};

export default authHook;
