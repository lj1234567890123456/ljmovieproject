// pages/cloudstorage/cloudstorage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  chooseImage(){
    let db=wx.cloud.database();
    let coll=db.collection('files');
    wx.chooseImage({
      count: 9,
      //album,指相册
      //camera指像机
      sourceType:['album','camera'],
      success:res=>{
        console.log(res);
        let filepaths = res.tempFilePaths;
        for(let n = 0;n<filepaths.length;n++){
          let filePath = filepaths[n];
          ///////////////////////////////////////////
          let date = new Date();
          let fullYear = date.getFullYear();
          let month = date.getMonth()+1;
          let day = date.getDate();
          let folderName = fullYear + '-' + month + '-' + day;
          let mainname = '' + Date.now() + Math.ceil(Math.random() * 999999);
          let extension = filePath.substr(filePath.lastIndexOf('.')+1).toLowerCase();
          let filename = mainname + '.' + extension;
          let cloudPath = folderName + '/' +  filename;
          ///////////////////////////////////////////
          wx.cloud.uploadFile({
            filePath:filePath,
            cloudPath:cloudPath,
            success:res=>{
              coll.add({
                data:{
                  filepath:res.fileID,
                  created_at:new Date()
                }
              })
              console.log(res);
            ///////////////////////////////////////////////////////
            }
          })          
        }
      }
    })
  },
  remove(){
    let db=wx.cloud.database();
    let coll=db.collection('files');
    coll.where({
      _id:db.command.eq('2f6ab8515fe45ffa006ce9bb72fb6ef2')
    }).remove({
      success:res=>{
        console.log(res)
      }
    });
  },
  update(){
    let db=wx.cloud.database();
    let coll=db.collection('files');
    coll.where({
      _id:'',
    }).update({
      success:res=>{
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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