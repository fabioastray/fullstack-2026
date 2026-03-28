import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { router } from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data is considered fresh. During this window, components
      // receive cached data instantly with no network request.
      staleTime: 1000 * 60 * 5, // 5 minutes

      // How long unused cache entries are kept in memory after all components
      // using them have unmounted. Once expired, the next mount triggers a fresh fetch.
      gcTime: 1000 * 60 * 10 // 10 minutes
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
