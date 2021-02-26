//index.js
//获取应用实例
const app = getApp()
const bmap=require('../../lib/bmap-wx.min.js');
Page({
  data: {
    //代表当前被选定的分类
   currentTab:1,
   //存储获取的影表列表数据 
   movieList:[],
   //储存页码 
   pageno:1,
  //储存当前定位的成市名称
   cityName:''
  },
  // 切换选项卡的事件
  switchTab(event){
    let id=event.target.dataset.id;
    this.setData({
      currentTab:id,
      pageno:1,
      movieList:[]
    });
    //获取指定分类的电影数据
    // wx.request({
    //   url:'https://api.tedu.cn/index.php',
    //   method:'GET',
    //   data:{
    //     cid:this.data.currentTab
    //   },
    //   success:res=>{
    //     this.setData({
    //       movieList:res.data
    //     });
    //     console.log(res.data);
    //   }
    // }) 
    //获取指定分类的电影数据
    this.loadData();
  },
  onLoad: function () {
    // wx.request({
    //   url:'https://api.tedu.cn/index.php',
    //   method:'GET',
    //   data:{
    //     cid:this.data.currentTab
    //   },
    //   success:res=>{
    //     this.setData({
    //       movieList:res.data
    //     });
    //     console.log(res.data);
    //   }
    // }) 
     //获取默认分类的电影数据（cid=1，正在热映的电影列表）
    this.loadData();
    wx.getLocation({
      type:'gcj02',
      success:res=>{
        // console.log(res)
        let map=new bmap.BMapWX({
          ak:'yNG9kpeecYB7TstCZ6o6UwbiCUGQukFU'
        });
        // 调用regeocoding()方法进行逆地址解析
        // map.regeocoding({
        //   location:{
        //     longitude:res.longitude,
        //     latitude:res.latitude
        //   },
        //   success:res=>{
        //     console.log(res);
        //   }
        // })
        map.regeocoding({
          success:res=>{
            // console.log(res);
            //百度地图定位
            this.setData({
              cityName:res.originalData.result.addressComponent.city
            })
          },
          fail:error=>{
            console.log(error);
          }
        });
      }
    })
  },

//加载自定义数据的方法
  loadData(){
    let pageno = this.data.pageno;
    let offset=(pageno-1)*20;
    //显示加载提示框
    wx.showLoading({
      title: '加载中.......',
    })
    wx.request({
      url:'https://api.tedu.cn/index.php',
      method:'GET',
      data:{
        cid:this.data.currentTab,
        offset:offset,
      },
      success:res=>{
        let movieList = this.data.movieList;
        movieList = movieList.concat(res.data);
        this.setData({
          movieList:movieList
        });
        wx.hideLoading();
        // console.log(res.data);
      }
    }) 
   
  },
  






  //监听用户上拉触底的事件
  onReachBottom(){
     //页码重新计算
     let pageno = this.data.pageno;
     pageno += 1;
     this.setData({
       pageno: pageno
     });
     this.loadData();
  },
  onPullDownRefresh(){
    console.log(Math.random());
  }
})
