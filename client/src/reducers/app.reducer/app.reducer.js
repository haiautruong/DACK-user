import userAction from './app.action';

const INITIAL_STATE = {
  language: 'en',
  newMessage: {
    messageID: undefined,
    conversationID: '',
    sender: '',
    message: ''
  },
  chatter: undefined
};

const applyChangeLanguage = (state, action) => ({
  ...state,
  language: action.payload.language
});
const applyChangeChatter = (state, action) => ({
  ...state,
  chatter: action.payload.chatter
});

const applyChangeNewMessage = (state, action) => ({
  ...state,
  newMessage: { ...action.payload.newMessage }
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userAction.CHANGE_LANGUAGE: {
      return applyChangeLanguage(state, action);
    }
    case userAction.SAVE_NEW_MESSAGE: {
      return applyChangeNewMessage(state, action);
    }
    case userAction.CHANGE_CHATTER: {
      return applyChangeChatter(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
