// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存储影片的详细信息
    info:{},
    //标识影片简介是否已经展开
    isOpen:false,
    //储存影片的评论数据
    comments:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
      let id = options.id;
      //获取当前影片的详细信息
      wx.request({
        url: 'https://api.tedu.cn/detail.php',
        method:'GET',
        data:{
          id:id
        },
        success:res=>{
          this.setData({
            info:res.data
          });
          //动态设置当前页面的标题
          wx.setNavigationBarTitle({
            title: '影片详情-' +res.data.moviename
          });
          // 隐藏标题栏加载动画
          wx.hideNavigationBarLoading();  
          //动态设置当前页面的标题栏背景颜色
          // wx.setNavigationBarColor({
          //   backgroundColor: '#ffffff',
          //   frontColor: ,
          // });
      

          // console.log(res.data);
        }
      });
      //获取数据库对象
      let db=wx.cloud.database();
      //获取集合对象
      let coll=db.collection('comments');
      //coll.get 获取集合中所有文档
      coll.field({nickname:true,content:true,_id:false}).where({
        // 等于可以直接写id
        //db.command属性的返回值为数据库的运算符对象
        movieid:db.command.eq(id)
        // orderBy desc 降序排列
      }).skip(0).limit(3).orderBy('_id','desc').get({
        success:res=>{
          console.log(res.data);
         this.setData({
           comments:res.data,
         });
        }
      })
      
      
      
      
      // coll.get({
      //   success:res=>{
      //     console.log(res.data);
      //   }
      // })
  },

  //展开/折叠影片的简介
  toggleDescription(){
      let isOpen = this.data.isOpen;
      this.setData({
        isOpen:!isOpen
      });
  },

  //预览图片
  previewImage(event){
    wx.previewImage({
      //[a.gif,b.gif,c.gif,d.gif]
      //要预览的图片形成的字符串数组
      urls: this.data.info.thumb,
      //当前预览的图片的路径
      current:event.target.dataset.path
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})