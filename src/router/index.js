import Vue from 'vue';
import Router from 'vue-router';
import contPanel from 'components/contentPanel/cont-panel';
import personTable from 'components/personTable/per-table';

Vue.use(Router)

export default new Router({
	mode:'history',
	base:'/',
	routes: [
		{
			path: '/',
			name: 'contPanel',
			component: contPanel,
			children:[
				{
					path:'/table',
					name:'table',
					component:personTable
				}
			]
		}
	]
})
