import store from "@/store"

const movePlayer = (cellToMove) => {
  store.commit('setMonsterSelected', null)
  let isMonsterTarget = store.getters.getMonsterSelected
  try {
    document.getElementById('cell-' + cellToMove).click()
    // TODO implementar con vuex para poder checkear si esta habilitado o no la vibracion en opciones
    // window.navigator.vibrate(15)
    if (!isMonsterTarget || (isMonsterTarget && isMonsterTarget.cellId !== cellToMove)) {
      document.getElementById('cell-' + cellToMove).querySelector('.monster').click()
    }
    // eslint-disable-next-line no-empty
  } catch (e) {
  }
}

export {
  movePlayer
}
