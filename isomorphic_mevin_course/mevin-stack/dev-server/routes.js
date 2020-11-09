import taskRoutes from './api/task/task-routes.js'
import authRoutes from './api/auth/auth-routes.js'
import regRoutes from './api/register/register-routes.js'
import userRoutes from './api/user/user-routes.js'

export function registerRoutes(app) {
    app.use('/api', taskRoutes)
    app.use('/api', authRoutes)
    app.use('/api', regRoutes)
    app.use('/api', userRoutes)
}