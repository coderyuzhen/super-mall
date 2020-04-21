<template>
 <div class="wrapper" ref="wrapper">
   <div class="content">
      <slot></slot>   
   </div>
 </div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name:"Scroll",
		props:{
			probeType:{
				type:Number,
				default: 0
			},
			pullUpLoad:{
				type:Boolean,
				default: false
			}
		},
		data(){
			return {
				scroll: null
			}
		},
		methods:{
			refresh(){
				this.scroll && this.scroll.refresh()
			}
		},
		mounted(){
			//创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper,{
				mouseWheel: true,
				click:true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			//监听滚动位置
			this.scroll.on('scroll',(position) =>{
			this.$emit('scroll',position)
		})
			
			//监听下拉加载更多
			this.scroll.on('pullingUp',()=>{
			this.$emit('pullingUp')
		})
		}
	}
</script>

<style scoped>

</style>