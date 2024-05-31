import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/index.vue";
import Chart from "../views/chart/index.vue"
import Chart2 from "../views/chart/index2.vue"
const routes = [
  {
    path: '/',
    redirect: "/home",
    children: [{
      path: "/home",
      component: Home
    },{
      path: "/chart",
      component: Chart
    },{
      path: "/chart2",
      component: Chart2
    }]
  }
]

const router = createRouter ({
  history: createWebHistory(),
  routes,
});

export default router;
