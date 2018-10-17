import {
  warn
} from '../log';
import history from '../history';
import {
  ui,
  user,
  panelStore
} from '../stores';

export const orgmodule = (ctx, {
  orgid = ctx.orgid,
  mid = ctx.mid,
  url = `/${orgid}/${mid}`
}) => {
  if (url) {
    history.push(url.replace('~', '/' + (orgid || user.orgid)));
  } else {
    warn('url is invalid');
  }
}

export const openModule = orgmodule;
export const module = orgmodule;

export const home = (ctx, {
  orgid = ctx.orgid
}) => {
  history.push(`/${orgid}`);
}

export const changePanel = (ctx, {
  orgid = ctx.orgid,
  pnlid,
  id=pnlid
}) => {
  if (panelStore.defaultPanel && panelStore.defaultPanel.id === id && user.defaultPanelInHome){
    home(ctx,{orgid});
    return;
  }
  history.push(`/${orgid}/panel/${id}`);
}


export const openModuleModal = ({
  title,
  text,
  orgid = user.orgid
}, {
  route,
  url,
  ...other
}) => {
  if (!(route || url)) {
    warn('url not found');
    return;
  }
  ui.modal.show({
    url: (route || url).replace('~', '/' + orgid),
    title: title || text,
    ...other
  });
}

export const hideModuleModal = () => {
  ui.modal.hide();
}

// export const gotoMyMenu = ()=>{
//   history.push('/my/menu');
// }
