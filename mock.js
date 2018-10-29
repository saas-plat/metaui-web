import 'saas-plat-login';
import 'saas-plat-tenant';
import 'saas-plat-manage';
import {stores} from 'saas-plat-clientfx';
stores.user.login({
  id: 'user001',
  orgid: 'org001'
});
stores.ui.loading = {
  show:()=>{},
  hide:()=>{}
}
