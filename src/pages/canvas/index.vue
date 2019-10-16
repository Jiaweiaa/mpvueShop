<template>
  <div>
    <button class="shareBtns" @tap='onSaveImg'>保存</button>
    <canvas canvas-id="myCanvas" style="position:fixed;visibily:hidden;width: 646px; height: 966px;" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
      
      };
    },
    onShow() {``
      this.onSaveImg();
    },
    methods: {
      onSaveImg: function () {
        const ctx = wx.createCanvasContext('myCanvas');         //看回wxml里的canvas标签，这个的myCanvas要和标签里的canvas-id一致
    
        ctx.clearRect(0, 0, 644, 966);
        ctx.drawImage("../../img/test1.png", 0, 0, 646, 966);
        ctx.drawImage("../../img/test2.png", 0, -60, 646, 966);
        ctx.drawImage("../../img/tipsImg123.png", 79, 291 - 60, 492, 244);
        ctx.drawImage("../../img/test3.jpg", 90, 780 - 60, 135, 135);
        ctx.setFillStyle("#02446e");
        ctx.setFontSize(26);
        ctx.fillText("亲爱的", 100, 610 - 60);
        ctx.setTextAlign("center");
        ctx.fillText("你的有入扔有人不迷", 435, 790 - 60);
    
        ctx.setTextAlign("left");
        ctx.setFillStyle("black");
        ctx.setFontSize(18);
        ctx.fillText("我等你", 330, 825 - 60);
        ctx.setFontSize(22);
    
        ctx.drawImage("../../img/test4.png", 0, 936 - 60, 646, 30);
        var self = this;
    
        ctx.draw(true, setTimeout(function () {     //为什么要延迟100毫秒？大家测试一下
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 646,
            height: 966,
            destWidth: 646,
            destHeight: 966,
            canvasId: 'myCanvas',
            success: function (res) {
              console.log(res);
            }
          })
        }, 100))
      },
    },
  
    saveImageToPhoto: function () {
      if (this.data.savedImgUrl != "") {
        wx.saveImageToPhotosAlbum({
          filePath: this.data.savedImgUrl,
          success: function () {
            wx.showModal({
              title: '保存图片成功',
              content: '寻人启事已经保存到相册，您可以手动分享到朋友圈！',
              showCancel: false
            });
          },
          fail: function (res) {
            console.log(res);
            if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
              wx.showModal({
                title: '保存图片失败',
                content: '您已取消保存图片到相册！',
                showCancel: false
              });
            } else {
              wx.showModal({
                title: '提示',
                content: '保存图片失败，您可以点击确定设置获取相册权限后再尝试保存！',
                complete: function (res) {
                  console.log(res);
                  if (res.confirm) {
                    wx.openSetting({})      //打开小程序设置页面，可以设置权限
                  } else {
                    wx.showModal({
                      title: '保存图片失败',
                      content: '您已取消保存图片到相册！',
                      showCancel: false
                    });
                  }
                }
              });
            }
          }
        })
      }
    }
  };

</script>
<style lang="scss">
</style>
