var maskAnimation = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease',
    delay: 0
});

var contentAnimation = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease',
    delay: 0
});

Component({
    // 在组件定义时的选项中启用多slot支持
    options: {
        multipleSlots: true
    },
    data: {
        showMask: false,
        //蒙层动画数据 -》 淡入淡出
        maskAnimationData: {},
        //退出拼车面板数据 -》从下往上
        contentAnimationData: {},
        //蒙层闪动问题
        showValue: false
    },
    methods: {
        // 关闭弹层
        closeMask: function() {
            this.showMaskChange(false);
        },
        //展示弹层
        showMask: function() {
            this.showMaskChange(true);
        },
        showMaskChange: function(val) {
            var that = this;
            if (val) {
                that.setData({
                    showValue: val
                }, () => {
                    maskAnimation.opacity(.6).step();
                    contentAnimation.translateY(0).step();
                    that.setData({
                        maskAnimationData: maskAnimation.export(),
                        contentAnimationData: contentAnimation.export()
                    })
                });
            } else {
                maskAnimation.opacity(0).step();
                contentAnimation.translateY('100%').step();
                that.setData({
                    maskAnimationData: maskAnimation.export(),
                    contentAnimationData: contentAnimation.export()
                });
                setTimeout(() => {
                    that.setData({
                        showValue: false
                    })
                }, 500);
            }
        }
    }
});