import {
  user,
  orgStore
} from '../stores';
import history from '../history';

export const logout = () => {
  user.logout();
}

export const lock = () => {
  user.lock();
}

export const changeLayout = (ctx, {
  name
}) => {
  user.changeLayout(name);
}

export const changeTheme = (ctx, {
  name
}) => {
  user.changeTheme(name);
}

export const login = (ctx, {
  name,
  password
}) => {
  user.login(name, password);
}

export const enterOrg = (ctx, {
  orgid
}) => {
  if (orgStore.orgs.find(it => it.id === orgid)) {
    user.enterOrg(orgid);
    history.push('/' + orgid);
  }
}

export const enterCurOrg = () => {
  history.push('/' + user.orgid);
}
