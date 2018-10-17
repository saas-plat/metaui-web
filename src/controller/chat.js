import {
  warn
} from '../log';
import {
  user,
  chat
} from '../stores';

export const openChat = (ctx, {
  uid,
  ...other
}) => {
  chat.open(uid,other);
}

export const sendMessage = (ctx, {
  uid,
  message,
  data
}) => {
  chat.send(user.id, uid, message,data)
}

export const findChatUser = (ctx, {
  name,
  query = name,
  ...other
}) => {
  chat.findUser(query,other);
}

export const openChatHistory = (ctx, {
  uid,
  ...other
}) => {
  chat.openHistory(uid,other);
}
