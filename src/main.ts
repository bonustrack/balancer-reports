import Vue from 'vue';
import { upperFirst, camelCase } from 'lodash';
import App from '@/App.vue';
import router from '@/router';
import '@/style.scss';

const requireComponent = require.context('@/components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.filter('shorten', (str = '') => `${str.slice(0, 6)}...${str.slice(str.length - 4)}`);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
