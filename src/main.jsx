import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes'
import AuthProvider from './Provider/AuthProvider'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router}>

          </RouterProvider>
        </div>
      </QueryClientProvider>
    </AuthProvider>

  </React.StrictMode>,
)
