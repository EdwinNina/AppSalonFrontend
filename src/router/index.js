import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppoinmentLayout from '@/views/appoinments/AppoinmentLayout.vue'
import AuthApi from '@/api/AuthApi'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservaciones',
      name: 'appoinments',
      component: AppoinmentLayout,
      meta: {
        auth: true
      },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('../views/appoinments/MyAppointmentsView.vue'),
        },
        {
          path: 'nueva',
          component: () => import('../views/appoinments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appoinments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('../views/appoinments/AppointmentView.vue'),
            }
          ]
        },
        {
          path: ':id/editar',
          component: () => import('../views/appoinments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('../views/appoinments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'edit-appointment-details',
              component: () => import('../views/appoinments/AppointmentView.vue'),
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'authentication',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue')
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'restablecer-password/:token',
          name: 'reset-password',
          component: () => import('../views/auth/NewPasswordView.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/dashboard/DashboardLayout.vue'),
      meta: {
        admin: true
      },
      children: [
        {
          path: '',
          name: 'dashboard-appointments',
          component: () => import('../views/dashboard/AppointmentsView.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = to.meta.auth
  // if(auth && !token) {
  //   next({ name: 'login' })
  // } else if(!auth && token) {
  //   next({ name: 'my-appointments' })
  // } else {
  //   next()
  // }
  if(auth) {
    try {
      const {data} = await AuthApi.auth()
      const isAdmin = data.data.admin
      if(isAdmin) {
        next({ name: 'dashboard-appointments'})
      } else {
        next()
      }
    } catch (error) {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const isAdmin = to.meta.admin

  if(isAdmin) {
    try {
      await AuthApi.admin()
      next()
    } catch (error) {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
