<template>
	<div id="home">
		<nav-bar class="home-nva"><div slot="center">购物街</div></nav-bar>
		<tab-control
				 :titles="['流行','新款','精选']" 
				 @tabClick="tabClick"
				 ref="tabControl1"
				 class="tab-control"
				 v-show="isTabfixed"/>
		<scroll class="content" 
			ref="scroll" 
			:probe-type="3" 
			@scroll="contentScroll"
			:pull-up-load="true"
			@pullingUp="lodeMore"
			>
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
			<recommend-view :recommends="recommends"/>
			<feature-view/>
			<tab-control
				 :titles="['流行','新款','精选']" 
				 @tabClick="tabClick"
				 ref="tabControl2"/>
			<goods-list :goods="goods[currentType].list"/>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar';
	import HomeSwiper from './childComps/HomeSwiper';
	import RecommendView from './childComps/RecommendView';
	import FeatureView from './childComps/FeatureView';
	
	import TabControl from '../../components/content/tabControl/TabControl'
	import GoodsList from '../../components/content/goods/GoodsList'
	import Scroll from '../../components/common/scroll/Scroll'
	import BackTop from '../../components/content/backTop/BackTop'
	
	import {getHomeMultidata,getHomeGoods} from '../../network/home';
	import {debounce} from "../../common/utils";

	export default{
		name:"Home",
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data(){
			return{
				banners:[],
				recommends:[],
				goods: {
					'pop':{page: 0, list: []},
					'new':{page: 0, list: []},
					'sell':{page: 0, list: []},
				},
				currentType:'pop',
				isShowBackTop:true,
				tabOffsetTop: 0,
				isTabfixed:false
			}
		},
		created(){
			//1、请求多个数据
			this.getHomeMultidata()
		//2、请求商品数据
		    this.getHomeGoods('pop')
		    this.getHomeGoods('new')
		    this.getHomeGoods('sell')
	},
	mounted(){
		 //3、监听图片加载完成事件
		 const refresh =debounce(this.$refs.scroll.refresh,50)
		  this.$bus.$on('itemimageload',()=>{
					refresh()
				})
		  //获取tabControl的offsetTop
		  //所有组件都有一个$el属性，用来获取组件中的元素的
//		  this.tabOffsetTop = this.$refs.tabConrtol.offsetTop
           
	},
	methods:{
		/**
			 *事件监听方法
			 * */
			
			tabClick(index){
				switch(index){
					case 0:
					this.currentType = 'pop'
					break
					case 1:
					this.currentType = 'new'
					break
					case 2:
					this.currentType = 'sell'
				}
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			backClick(){
				this.$refs.scroll.scroll.scrollTo(0,0,800)
			},
			contentScroll(position){
				this.isShowBackTop = -position.y >1000
				
				//决定吸顶
				this.isTabfixed = (-position.y) > this.tabOffsetTop
			},
			lodeMore(){
				this.getHomeGoods(this.currentType)
			},
			swiperImageLoad(){
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
			},
			
			/**
			 *网络请求相关方法*/
		getHomeMultidata(){
			getHomeMultidata().then(res =>{
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			})
		},
		getHomeGoods(type){
			const page = this.goods[type].page + 1
			getHomeGoods(type,page).then(res =>{
				this.goods[type].list.push(...res.data.list)
				this.goods[type].page +=1
				//完成上拉加载更多
				this.$refs.scroll.scroll.finishPullUp()
			})
		}
	}
	}
</script>

<style scoped>
	#home{
		padding-top: 44px;
	}
	.home-nva{
		background-color: var(--color-tint);
		color: white;
		
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	.content{
		position: absolute;
		bottom:49px;
		top: 44px;
		overflow: hidden;
	}
	.tab-control{
		position: relative;
		z-index: 9;
		
	}
</style>