'use strict'
/****pruduct****/
const Product=`
	<div class="m-cont">
	<pro-list :goods='goods'
				:activeIndex='index'
				@showlist='changeShowList'
				class="prolist"></pro-list>
	<pro-item :goods='goods' 
			  :counts='counts'
			  :activeIndex='index'
			  @sumAll="sumAll"></pro-item>
	<pro-count :sum='counts'></pro-count>
</div>`


/***prolist  产品分类列表*****/
const prolist=`
	<ul class="m-pro-nav" id="prolist" >
		<li v-for="(item, index) in goods"><span class='u-order' :id='index' @click='showlist'>{{item.name}}</span></li>
	</ul>
`
/****proitem  产品列表*********/
const proitem=`
	<div class="m-pro-wrap">
		<div class="m-pro-cont" v-for='(item, index) in goods' :id='index'>
				<h6>{{item.name}}</h6>
				<ul >
				<li v-for='i in item.foods'>
					<my-food :food='i'
						 @sumAll="sumAll"
					>
					</my-food>
				</li>
			</ul>
		</div>
	</div>
`

/***food**********/
const myfood=`
		<div class='m-food-item g-clearfix'>
			<div class='m-food-left g-fl'>
				<img :src='food.icon'/>
			</div>
			<div class='m-food-right g-fl'>
				<p class='u-food-name'>{{food.name}}</p>
				<p class='u-food-more'>
					<span>月售{{food.sellCount}}份</span>
					<span>好评率{{food.rating}}%</span>
				</p>
				<p class='u-food-price'>￥{{food.price}}</p>
				<div class='m-btns'>
					<span class='u-btn-reduce' @click='reduceCount'>-</span><input type="text" v-model='counts.num'/><span class='u-btn-add' @click='addCount'>+</span>
				</div>
			</div>
		</div>

`
/****空的 Vue 实例作为中央事件总线****/
const bus = new Vue()
const myFood=Vue.component("my-food", {
	template:myfood,
	props:{
		food:Object
	},
	data:function(){
		return {
			name:this.food.name,
			counts:{
				num:0,
				price:this.food.price
			}
		}
	},
	methods:{
		addCount:function(){
			this.$emit('sumAll', {num: 1,price:this.counts.price,name:this.name})
			this.counts.num++
			//  this.$emit('addCount',{num:this.counts.num,price:this.counts.price,name:this.name})
//			bus.$emit('changeTotal',{num:this.counts.num,price:this.counts.price,name:this.name});
		},
		reduceCount:function(){			
			if(this.counts.num>0){
				this.$emit('sumAll', {num: -1,price:this.counts.price,name:this.name})
			}
			this.counts.num>0?this.counts.num--:0
			//  this.$emit('reduceCount',{num:this.counts.num,price:this.counts.price,name:this.name})
//			bus.$emit('changeTotal',{num:this.counts.num,price:this.counts.price,name:this.name});
		}
	}
})

/****procount 价格合计******/
const procount=`
	<div class='m-count'>
		<span>选中:{{sum.num}}</span>
		<span>合计:{{sum.total}}</span>
		<span @click='toCount'>去结算</span>
	</div>
`
// 数据
const goods=Data.goods
console.log(goods)

// vue 实例
const proList=Vue.component("pro-list", {
	template:prolist,
	props:{
		goods:{},
		activeIndex:0,
	},
	methods:{
		showlist(ev){			
			const id=ev.target.getAttribute('id')
			$(ev.target).parent("li").addClass('z-active').siblings('li').removeClass('z-active')
			console.log(ev.target,id)
			this.$emit('showlist',id)
		}
	}
})
const proCount=Vue.component("pro-count",{
	template:procount,
	props: ['sum'],
	data:function(){
		return {
				counts:{
//					num:bus.mes?bus.mes.num:0,
//					total:bus.mes?bus.mes.price:0
					num:0,
					total:0
				},
				list:[]
			}
	},
	methods:{
//		changeCount(){
//			this.counts.num=bus.mes.num
//			this.counts.total=bus.mes.price
//		}
		toCount(){
			alert("你还真想结算啊~~~")
		}
	},
	created() {
	    bus.$on('changeTotal',function(a){
	    	this.mes=a
	    	console.log(this.mes)

//
//	    	const buydata=localStorage.getItem('buylist')
//	    	console.log(buydata)
//	    	var onoff=false
//	    	if(buydata){
//	    		var arr=JSON.parse(buydata)
//	    		console.log(arr)
//	    		arr.forEach(function(item,i){
//	    			if(item.name==a.name){
//	    				console.log(i,item)
//	    				item.num=a.num
//	    				onoff=true
//	    			}
//	    		})
//	    		if(!onoff){
//	    			arr.push(a)
//	    		}
//	    	}else{
//	    		var arr=[]
//	    		a=JSON.stringify(a)
//	    		arr.push(a)
//
//	    	}
//	    	const str=JSON.stringify(arr)
//	    	localStorage.setItem('buylist',str)
//
	    })
	}
})

// 右边列表
const proItem=Vue.component("pro-list",{
	template:proitem,
	props:{
		goods:{},
		activeIndex:0,
		buylist:[],
		num:0
	},
	watch:{
	 	activeIndex:function(newValue, oldValue){
			var scrolltop=0
			if(newValue>0){
				for(var i=0;i<newValue;i++){
					const hei=$(".m-pro-cont").eq(i).height()
//					console.log(hei)
					scrolltop=hei+scrolltop
					
				}
			}
//			console.log(scrolltop)
//			$(".m-pro-wrap").scrollTop(scrolltop)
			$(".m-pro-wrap").animate({scrollTop:scrolltop},{easing:'linear'},800)
	 	}
	},
	methods:{
		getPos:function(){
			const arr=[]
			$(".m-pro-cont").each(function(i,item){
				arr.push($(".m-pro-cont").offset().top)
			})
			return arr
		},
		changeCountadd:function(a){
			num++
			console.log(a,num)
		},
		changeCountreduce:function(a){
			console.log(a)
		},
		sumAll(options){
			this.$emit('sumAll',options)
		},
		animateShow(height){
			const hei=0
			const timer=setInterval(function(){
				if(height>0){
					if(hei<height){
						hei=hei+10
						$(".m-pro-wrap").scrollTop($(".m-pro-wrap").scrollTop()-10)
					}else{
						$(".m-pro-wrap").scrollTop($(".m-pro-wrap").scrollTop()-(hei-height))
						clearInterval(timer)
					}
				}
				if(height<0){
					if(hei>height){
						hei=hei-10
						$(".m-pro-wrap").scrollTop($(".m-pro-wrap").scrollTop()+10)
					}else{
						$(".m-pro-wrap").scrollTop($(".m-pro-wrap").scrollTop()+(hei-height))
						clearInterval(timer)
					}
				}
			},100)
		}

	},
	components:{
		'my-food':myFood
	}
})
// 总商品
const product=Vue.component('product', {
	template: Product,
	data:function(){
		return{
			goods:goods,
			index:0,
			counts:{
				num:0,
				total:0
			}
		}
	},
	components:{
		'pro-list':proList,
		'pro-item':proItem,
		'pro-count':proCount
	},
	methods:{
		sumAll(options){
			this.counts.num = this.counts.num + options.num
			this.counts.total = this.counts.total + options.num*options.price
		},
		changeShowList(id){
			console.log(id)
			this.index=Number(id)
		}
	}
})



