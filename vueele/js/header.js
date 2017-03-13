const header=`
	<div class="g-head ">				
		<div class="m-head g-clearfix">
			<div class="u-mask blur"></div>
			<div class="g-fl">
				<img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"/>
			</div>
			<div class="g-fl">
				<p class="z-name">
					<span class="z-brand">品牌</span>
					<span>
						{{seller.name}}
					</span>
				</p>
				<p>
					<span>{{seller.description}}</span>/<span>{{seller.deliveryTime}}分钟</span>
				</p>
				<p>
					<span class="z-sale">减</span>{{seller.supports[0].description}}
				</p>
			</div>
		</div>
		<div class="m-announcement">
			<span>公告</span>
			<p>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
			<!--<span></span>-->
		</div>
	</div>
`
	const sellers=Data.seller
	console.log(sellers)
	const childheader=Vue.component('my-header', {
		template:header,
		data:function(){
			return {
				'seller':sellers
			}
		}
	})