// 第三方库
import Vue from 'vue';
import iView from 'iview';

// iview默认样式
// import 'iview/dist/styles/iview.css';

// 使用iView自定义样式
import './styles/xbsj-custom-iview.less';

// 自定义样式
import './styles/cesium.css';

// 导入相关组件
import XbsjApp from './components/XbsjApp.vue';

Vue.use(iView);

var app = new Vue({
    el: '#app',
    components: {
        XbsjApp: XbsjApp,
    },
});

// 隐藏loading
var loading = document.getElementById("loading");
loading && (loading.style.display = "none");