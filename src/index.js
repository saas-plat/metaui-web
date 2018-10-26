import routes from './routes';
import * as stores from './stores';
import {
  registerRoutes,
  registerStores,
  extendRender
} from 'saas-plat-clientfx';
import ModuleBreadcrumb from './components/portal/ModuleBreadcrumb';

registerStores(stores);
registerRoutes(routes);
extendRender.breadcrumb = [...(extendRender.breadcrumb || []), ModuleBreadcrumb];
