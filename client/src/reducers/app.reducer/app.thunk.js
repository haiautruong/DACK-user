import {
  doChangeLanguage,
  doSaveNewMessage,
  doChangeChatter
} from './app.action';

export const changeLanguage = language => async dispatch => {
  dispatch(doChangeLanguage(language));
};

export const saveNewMessage = newMessage => async dispatch => {
  dispatch(doSaveNewMessage(newMessage));
};

export const changeChatter = chatter => async dispatch => {
  dispatch(doChangeChatter(chatter));
};
