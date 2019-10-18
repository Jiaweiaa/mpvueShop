<template>
    <div>
      <canvas @click="savePhotoFn" canvas-id="canvas" class="canvas"></canvas>
    </div>
   
</template>

<script>
  import {
    getMemberHeadAndLevel
  } from "../../api/canvas";
  
  export default {
    data () {
      return {
        // 二维码
        qrCode: "",
        // 分享图片地址
        shareImgPath: "",
        // 画板准备
        canvasReady: false,
        
        // 用户名
        nickName: "",
        position: "",
        headImg: ""
      }
    },
    onShow() {
      // 获取用户相册权限
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success: function (res) {
        }
      });
      this.getData();
    },
    methods: {
      // 元素弧度角
      roundRect(ctx, x, y, w, h, r, c) {
        if (w < 2 * r) {
          r = w / 2;
        }
        if (h < 2 * r) {
          r = h / 2;
        }
        
        ctx.beginPath();
        ctx.fillStyle = c;
        
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.lineTo(x + w, y + r);
        
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
        ctx.lineTo(x + w, y + h - r);
        ctx.lineTo(x + w - r, y + h);
        
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
        ctx.lineTo(x + r, y + h);
        ctx.lineTo(x, y + h - r);
        
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
        ctx.lineTo(x, y + r);
        ctx.lineTo(x + r, y);
        
        ctx.fill();
        ctx.closePath();
      },
      
      // 获取页面数据
      getData() {
        wx.cloud.callFunction({
          name: "getStoreQrcode",
          data: {
            storeId: 1
            // memberId: 1146359099936837633
          }
        }).then(res => {
          if (res.result.buffer) {
            this.qrCode = wx.arrayBufferToBase64(res.result.buffer);
            this.drawImg();
          }
        })
        .catch(err => {
          console.log("失败回调", err);
        });
  
        getMemberHeadAndLevel().then(res => {
          this.headImg = 'http:' + res.data.result.head;
          this.nickName = res.data.result.nickname;
          this.position = res.data.result.position;
        })
      },
  
      // 图片圆角
      circleImg(ctx, img, x, y, r) {
        ctx.save();
        let d =2 * r;
        let cx = x + r;
        let cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, x, y, d, d);
        ctx.restore();
      },
      
      // 画图
      drawImg() {
        /// 二维码base64转成临时图片路径
        let FILE_BASE_NAME = 'tmp_base64src';
        let filePath =  `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.png`;
        let buffer = wx.base64ToArrayBuffer(this.qrCode);
        let _this = this;
        wx.getFileSystemManager().writeFile({
          filePath,
          data: buffer,
          encoding: 'binary',
          success() {
            wx.getImageInfo({ //读取图片
              src: filePath,
              complete: function (res) {
                // 下载文件
                wx.downloadFile({
                  url: "http://pzgc7ja3h.bkt.clouddn.com/logo.jpeg", //网络路径
                  success: function(res1) {
                    wx.downloadFile({
                      url: "http://pzgieqia2.bkt.clouddn.com/poster_bg.jpeg", //网络路径
                      success: function(res2) {
                        wx.downloadFile({
                          url: _this.headImg, //网络路径
                          success: function (res3) {
                            let context = wx.createCanvasContext("canvas"); //这里的“share”是“canvas-id”
                            // logo图
                            let logoImg = res1.tempFilePath;
                            // 背景图
                            let img = res2.tempFilePath; //商品图片保存地址
                            
                            let screenWidth = wx.getSystemInfoSync().windowWidth;
                            let screenHeight = wx.getSystemInfoSync().windowHeight;
  
                        
                            context.setFillStyle("#fff");
                            context.drawImage(img, 0, 0, screenWidth, screenHeight); //绘制商品图片
  
                            // 两个主题框
                            _this.roundRect(context, ((screenWidth - 300) / 2), (screenHeight * 0.67), 300, 90, Math.PI * 2, '#fff');
                            _this.roundRect(context, ((screenWidth - 300) / 2), (screenHeight * 0.85), 300, 70, Math.PI * 2, '#fff');
  
                            // 头像名称职位
                            // 头像
                            _this.circleImg(context, res3.tempFilePath, ((screenWidth - 300) / 2) + 20, (screenHeight * 0.7), 30);
                            // 名称
                            context.setFontSize(16);
                            context.setFillStyle("#000");
                            context.fillText(_this.nickName, ((screenWidth - 300) / 2) + 100, (screenHeight * 0.65) + 50); //绘制描述
                            // 职位
                            context.setFontSize(14);
                            context.setFillStyle("#999");
                            context.fillText(_this.position, ((screenWidth - 300) / 2) + 100, (screenHeight * 0.65) + 80); //绘制描述
  
  
                            // 易起省logo 字体
                            context.drawImage(logoImg, ((screenWidth - 300) / 2) + 15, (screenHeight * 0.85) + 10, 45, 45); //绘制商品图片
                            context.setFontSize(16);
                            context.setFillStyle("#000");
                            context.fillText('易起省', ((screenWidth - 300) / 2) + 80, (screenHeight * 0.85) + 38); //绘制描述
                            // 二维码
                            context.drawImage(filePath, ((screenWidth - 300) / 2) + 235, (screenHeight * 0.85) + 14, 45, 45); //绘制二维码
  
                            //把画板内容绘制成图片，并回调画板图片路径
                            context.draw(false, function() {
                              wx.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                width: screenWidth,
                                height: screenHeight,
                                destWidth: screenWidth * 3,
                                destHeight: screenHeight * 3,
                                canvasId: "canvas",
                                quality: 1,
                                success: res => {
                                  // console.log(res.tempFilePath);
                                  //将绘制的图片地址保存在shareImgPath 中
                                  _this.shareImgPath = res.tempFilePath;
                                  _this.canvasReady = true;
                                }
                              });
                            });
                          }
                        })
                      }
                    });
                  },
                  fail: function(err){
                    console.log('err')
                  }
                });
              }
            })
          }
        });
      },
      
      // 保存到相册操作
      savePhotoFn() {
        let _this = this;
        wx.showLoading({
          title: '保存中...',
        });
        if (_this.canvasReady) {
          _this.savePhoto()
        } else {
          setTimeout(function () {
            if (_this.canvasReady) {
              _this.savePhoto()
            } else {
              setTimeout(function () {
                if (_this.canvasReady) {
                  _this.savePhoto()
                } else {
                  alert('操作太快')
                }
              }, 2000)
            }
          }, 1000)
        }
      },
      savePhoto() {
        let _this = this;
        //画板路径保存成功后，调用方法吧图片保存到用户相册
        wx.saveImageToPhotosAlbum({
          filePath: _this.shareImgPath,
          //保存成功失败之后，都要隐藏画板，否则影响界面显示。
          success: (res) => {
            wx.hideLoading();
            wx.showToast({
              title: '保存到相册成功',
              icon: 'success',
              duration: 1500
            })
            
          },
          fail: (err) => {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 1500
            })
            wx.hideLoading()
      
          }
        })
      }
    }
  }
</script>
<style>
  .canvas {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
