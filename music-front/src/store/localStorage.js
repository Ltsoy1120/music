export const saveToLocalStorage = state => {
    try{
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state',serializedState)
    }catch(e){
      console.log('Could not save state')
    }
}
export const loadFrontLocalStorage = () => {
    try{
      const serializedState = localStorage.getItem('state')
      if(serializedState === null) {
        return undefined
      }
      return JSON.parse(serializedState)
    }catch(e){
      return undefined
    }
}