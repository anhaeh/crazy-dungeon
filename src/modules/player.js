import store from "@/store"

const movePlayer = (cellToMove) => {
  store.commit('setMonsterSelected', null)
  let isMonsterTarget = store.getters.getMonsterSelected
  try {
    document.querySelector('#cell-' + cellToMove).click()
    if (!isMonsterTarget || (isMonsterTarget && isMonsterTarget.cellId !== cellToMove)) {
      document.querySelector('#cell-' + cellToMove + ' .monster').click()
    }
    // eslint-disable-next-line no-empty
  } catch (e) {
  }
}

export {
  movePlayer
}
