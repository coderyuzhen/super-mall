<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive">
		    <slot name="item-icon"></slot>
	    </div>
	
  		<div v-else>
  			<slot name="item-icon-active"></slot>
  		</div>
  		
  		<div :style="activeStyle">
  			<slot  name="item-text"></slot>
  		</div>
  		
	</div>
</template>

<script>
	export default{
		name:"TabBarItem",
		props:{
			path:String,
			activeColor:{
				type:String,
				//默认时
				default:'#DC143C'
			}
		},
		data(){
			return {
//				isActive:true
			}
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle(){
				return this.isActive ? {color: this.activeColor} : {}
			}
		},
		methods:{
			itemClick(){
				this.$router.replace(this.path)
			}
		}
	}
</script>

<style>


.tab-bar-item img{
	width: 24px;
	height: 24px;
	margin-top: 3px;
	vertical-align: middle;
	margin-bottom: 2px;
}

.active{
	color: #DC143C;
}
</style>