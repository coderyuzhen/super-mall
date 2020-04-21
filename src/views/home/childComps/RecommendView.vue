<template>
<div class="recommend">
	<div v-for="item in recommends" class="recommend-item">
		<a :href="item.link">
		<img :src="item.image"/>
		<div>{{item.title}}</div>
		</a>
	</div>
</div>
</template>

<script>
	export default{
		name:"RecommendView",
		props:{
			recommends:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.recommend{
		display: flex;
		width: 100%;
		text-align: center;
		border-bottom:8px solid gainsboro;
		padding: 15px 0px 30px;
		font-size: 12px;
	}
	
	.recommend-item{
		flex: 1;
		width: 70px;
		height: 70px;
	}
	
	.recommend-item img{
		width: 70px;
		height: 70px;
	}
	
</style>