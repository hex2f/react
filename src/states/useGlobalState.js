import React from 'react'

function setState (newState) {
  this.state = typeof (this.state) === 'object' ? { ...this.state, ...newState } : newState
  this.listeners.forEach((listener) => {
    listener(this.state)
  })
}

function useCustom () {
  const newListener = React.useState()[1]
  React.useEffect(() => {
    this.listeners.push(newListener)
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== newListener)
    }
  }, [])
  return [this.state, this.action]
}

const useGlobalState = (initialState, action = (store, value) => { store.setState(value) }) => {
  const store = { state: initialState, listeners: [] }
  store.setState = setState.bind(store)
  store.action = action.bind(null, store)
  return useCustom.bind(store)
}

export default useGlobalState
