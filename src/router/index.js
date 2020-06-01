import Vue from 'vue'
import VueRouter from 'vue-router'
import FormDesignPage from '../views/FormDesignPage.vue'
import FormTemplateListPage from '../views/FormTemplateListPage.vue'
import OverlayDesignPage from '../views/OverlayDesignPage.vue'
import OverlayListPage from '../views/OverlayListPage.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/forms'
}, {
    name: 'formDesign',
    path: '/formDesign/:id',
    component: FormDesignPage
}, {
    path: '/forms',
    component: FormTemplateListPage
}, {
    path: '/overlays',
    component: OverlayListPage
}, {
    path: '/overlayDesign',
    component: OverlayDesignPage
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router