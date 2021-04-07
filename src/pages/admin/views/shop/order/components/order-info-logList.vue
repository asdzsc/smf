 <template>
	 <div style="padding-top: 30px;">
	   <div class="modelTitle">
	     订单记录
	   </div>
	   <div class="card">
	     <div class="orderLog">
	       <a-timeline>
	         <a-timeline-item
	           v-for="item in shopOrder.logList"
	           :key="item.id"
	           color="#004930"
	         >
	           {{
	             parseTime(item.createDate, "{y}-{m}-{d} {h}:{i}")
	           }}&nbsp;&nbsp;{{ item.cont }}
	         </a-timeline-item>
	       </a-timeline>
	     </div>
	   </div>
	 </div>
</template>

<script>
	import * as utils from "@/pages/admin/libs/utils";
	import * as shop from "@/comment/dictionary";
	export default {
		props: {
			shopOrder: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/usernull.png'`
			}
		},
		mounted() {
	
		},
		methods: {
			parseTime(time) {
				if (time) {
					return utils.parseTime(time, "{y}-{m}-{d}");
				} else {
					return ''
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.modelTitle {
	  height: 48px;
	  background-color: #ebebeb;
	  font-size: 16px;
	  line-height: 48px;
	  color: #333333;
	  padding-left: 30px;
	}
	
	.card {
	  border: solid 1px #ebebeb;
	  margin-bottom: 10px;
	
	  &:last-child {
	    margin-bottom: 0px;
	  }
	
	  .orderLog {
	    padding: 30px;
	    height: 180px;
	    overflow-y: auto;
	  }
	
	}
	
</style>