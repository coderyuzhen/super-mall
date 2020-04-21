<template>
  <div id="tab-bar">
  	<slot></slot>
  </div>
</template>

<script>
	export default{
		name:"TabBar"
	}
</script>

<style>
	#tab-bar{
	display: flex;
	background-color: aliceblue;
	
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	box-shadow: 0px -2px 1px rgba(0,0,0,0.1) ;
	
	font-size: 14px;
}

.tab-bar-item{
	flex: 1;
	text-align: center;
	height: 49px;
}
</style>