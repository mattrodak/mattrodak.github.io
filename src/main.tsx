import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { ModalProvider } from './providers/ModalProvider/ModalProvider'
import { store } from './store/store'

import './index.css'

const persistor = persistStore(store)

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalProvider>
            <App />
          </ModalProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
