const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
const SAVE_NEW_MESSAGE = 'SAVE_NEW_MESSAGE';
const CHANGE_CHATTER = 'CHANGE_CHATTER';

export default {
  CHANGE_LANGUAGE,
  SAVE_NEW_MESSAGE,
  CHANGE_CHATTER
};

const doChangeLanguage = language => ({
  type: CHANGE_LANGUAGE,
  payload: {
    language
  }
});

const doChangeChatter = chatter => ({
  type: CHANGE_CHATTER,
  payload: {
    chatter
  }
});

const doSaveNewMessage = newMessage => ({
  type: SAVE_NEW_MESSAGE,
  payload: {
    newMessage
  }
});

export { doChangeLanguage, doSaveNewMessage, doChangeChatter };
