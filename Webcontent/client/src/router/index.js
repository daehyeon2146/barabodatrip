import { createRouter, createWebHistory } from 'vue-router'
import IdtMain from '../views/IdtMain.vue'
import TripList from '../views/front/TripList.vue'
import TripDetail from '../views/front/TripDetail.vue'
import MycartList from '../views/front/MycartList.vue'
import OrderList from '../views/front/OrderList.vue'
import CommentList from '../views/front/CommentList.vue'


import ProductCreate from '../views/admin/ProductCreate.vue'
import ProductUpdate from '../views/admin/ProductUpdate.vue'
import SalesList from '../views/admin/SalesList.vue'
import OptionCreate from '../views/admin/OptionCreate.vue'
import OptionList from '../views/admin/OptionList.vue'
import OptionUpdate from '../views/admin/OptionUpdate.vue'


import BbqEvent from '../views/event/BbqEvent.vue'
import ChikinEvent from '../views/event/ChikinEvent.vue'
import CrabEvent from '../views/event/CrabEvent.vue'
import CruiseEvent from '../views/event/CruiseEvent.vue'


const routes = [
  {
    path: '/commentList',
    name: 'CommentList',
    component: CommentList
  },
  {
    path: '/',
    name: 'IdtMain',
    component: IdtMain
  },
  
  
  {
    path: '/tripList',
    name: 'TripList',
    component: TripList
  },
  {
    path: '/tripDetail',
    name: 'TripDetail',
    component: TripDetail
  },
  {
    path: '/create',
    name: 'ProductCreate',
    component: ProductCreate
  },
  {
    path: '/update',
    name: 'ProductUpdate',
    component: ProductUpdate
  },
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList
  },
  
  
  {
    path: '/bbqEvent',
    name: 'BbqEvent',
    component: BbqEvent
  },
  {
    path: '/chikinEvent',
    name: 'ChikinEvent',
    component: ChikinEvent
  },
  {
    path: '/crabEvent',
    name: 'CrabEvent',
    component: CrabEvent
  },
  {
    path: '/cruiseEvent',
    name: 'CruiseEvent',
    component: CruiseEvent
  },
  {
    path: '/optionCreate',
    name: 'OptionCreate',
    component: OptionCreate
  },
  {
    path: '/optionList',
    name: 'OptionList',
    component: OptionList
  },
  {
    path: '/optionUpdate',
    name: 'OptionUpdate',
    component: OptionUpdate
  },
  {
    path: '/mycart',
    name: 'MycartList',
    component: MycartList
  },
  {
    path: '/order',
    name: 'OrderList',
    component: OrderList
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

