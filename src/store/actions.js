export default {
  addCart(context, playload) {
    return new Promise((resolve, reject) => {
      //查找之前数组中是否有该商品
      let product = context.state.cartList.find(item => item.iid === playload.iid)
      if (product) {
        context.commit('addCounter',product);
        resolve('当前商品数量+1')
      } else {
        context.commit('addToCart', playload);
        resolve('添加了新的商品')
      }
    })
  }
}