import Vue from 'vue'
import Vuex from 'vuex'
// 引入腾讯地图jssdk文件
import QQMapWX from '../static/js/qqmap-wx-jssdk.min.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
    	// isLogin :uni.getStorageSync('isLogin')?true:false,
		city:''
    },
    mutations: {
    	// update(state,[key,value]){
    	// 	state[key]=value;
    	// },
		//将token保存到sessionStorage里，token表示登陆状态
		SET_TOKEN: (state, data) => {
		    state.token = data
		    uni.setStorageSync('token', data) 
		},
    },
	actions:{
		// 异步获取地理位置
		getCity(context){
			uni.authorize({
				// 获取授权
				scope:"scope.userLocation",
				success() {
					// 引入腾讯地图api
					let qqmapsdk = new QQMapWX({
					    key: 'VQHBZ-RTP3U-UA5VC-4WWBD-D6ZH6-C7FTO'
					});
					uni.getLocation({
						type:'gcj02',
						success(res) {
							console.log('当前位置的经度：' + res.longitude);
							console.log('当前位置的纬度：' + res.latitude);
							// 当前位置的经度
							var longitude = res.longitude
							// 当前位置的纬度
							var latitude = res.latitude
							 // qqmapsdk.reverseGeocoder({
								//  location:{
								// 	  latitude:res.latitude,
								// 	  longitude:res.longitude
								//  },
								//  success(res){
								// 	 console.log(res)
								// 	 console.log(res.result.address)
								// 	 context.state.city= res.result.address
								// 	 console.log(context.state.city)
								//  }
							 // })
					
						}
					});
				
				},
				fail(res) {
					uni.showToast({
						icon:"none",
						title:"如果不开启定位授权,部分功能无法实现",
						duration:2000
					})
				}
			
			})
		}
	}
})
export default store