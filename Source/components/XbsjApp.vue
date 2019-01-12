<template>
    <div style="width: 100%; height: 100%">
        <div style="position: relative; width: 100%; height: 100%" ref="coreViewer">
            <div ref="viewer" style="width: 100%; height: 100%"></div>
            <div style="position: absolute; top: 10px; left: 10px; padding: 0px; background-color: rgba(0, 0, 0, 0.2); border-radius: 10px;">
                <Button type="primary" style="margin: 5px;" shape="circle" icon="ios-home" @click="goHome" title="返回初识视角"></Button>
                <Button type="primary" style="margin-right: 5px;" shape="circle" :icon="isFullscreen ? 'ios-contract' : 'ios-expand'" @click="enableFullscreen(!isFullscreen)" title="全屏" ></Button>
            </div>
        </div>
    </div>
</template>

<script>
import initViewer from '../scripts/initViewer';

export default {
    name: "xbsjApp",
    mounted() {
        this.$nextTick(() => {
            const viewer = initViewer(this.$refs.viewer);

            this.freezedViewer = Object.freeze({viewer});

            var that = this;
            document.addEventListener(Cesium.Fullscreen.changeEventName, () => {
                that.isFullscreen = Cesium.Fullscreen.fullscreen;
            });
        });
    },
    data() {
        return {
            isFullscreen: false,
            freezedViewer: undefined,
        };
    },
    methods: {
        goHome() {
            // 指向中国位置
            const viewer = this.freezedViewer && this.freezedViewer.viewer;
            viewer && viewer.camera.flyHome();
        },
        enableFullscreen(enable) {
            if (enable) {
                !Cesium.Fullscreen.fullscreen && Cesium.Fullscreen.requestFullscreen(this.$refs.coreViewer);
            } else {
                Cesium.Fullscreen.fullscreen && Cesium.Fullscreen.exitFullscreen();
            }
        },
    }
};
</script>