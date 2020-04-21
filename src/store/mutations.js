export default {
  //mutations唯一的目的修改state中的状态  但是每个方法尽可能完成事情单一一点  这是可以写在actions中
  addCounter(state, playload) {
    playload.count
  },
  addCart(state, playload) {
    playload.checked = true
    state.cartList.push(playload)
  }
}