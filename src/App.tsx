import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './views/Menu';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = {
  basename: string
}

const queryClient = new QueryClient()

const App: React.FC<Props> = ({ basename }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={'Loading...'}>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Menu />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
