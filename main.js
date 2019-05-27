// tab active change
$(".tabs ul").on("click","li", function(){
  $(this).addClass("tab-active")
   .siblings().removeClass("tab-active");
  
  $(".content").eq($(this).index())
               .addClass("content-acitve")
               .siblings()
               .removeClass("content-acitve");
});

// detect scroll to bottom event
function isBottom($viewport,$content) {
  return $viewport.height() + $viewport.scrollTop() + 10 > $content.height();
}


var proj = {
  init: function(){
    var _this = this;
    this.isLoading = false;
    this.container = $(".content").eq(0);
    this.content = $(".content").eq(0).find(".container");
    this.pageIndex = 1;        
    this.bind();
    this.getData(this.pageIndex);
  },
  
  bind:function(){
    var _this = this;
    _this.container.on("scroll",function (){
      if(isBottom(_this.container, _this.content) && !_this.isLoading){
        $(".loading").show(400);             
         _this.getData(_this.pageIndex);  
          // console.log(_this.pageIndex*30);
          // console.log()
      };
    })        
  },
  
  getData:function(pageIndex){
    var _this = this;
    _this.isLoading = true;
    $(".loading").show();
    // console.log("getdata function");
    $.ajax({
      url: "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc",
      method:"GET",
      data: {
        page:pageIndex
      }
    }).done(function(result){
      $(".loading").hide(400);
      _this.renderData(pageIndex,result);
      _this.isLoading = false;
      _this.pageIndex++;
      // console.log(_this.pageIndex);
      // console.log(result.total_count);
    });        
  },
  
  renderData:function(pageIndex,result) {
    var _this = this;
    // console.log("render function");
    result.items.forEach(function(item,index){
     var $node = $(`<div class="items clearfix">
      <div class="index"><span>1</span></div>
      <a href="" target="_blank"><div class="detail"><div class="name">react</div></a>
      <div class="description">reafoea</div></div>
      <div class="count">
      <span class="stars">134432 stars</span>
      <span class="forks">24232 forks</span>
          </div>
          </div>`);
      $node.find("a").attr("href",item.html_url);
      $node.find(".index span").text((pageIndex-1)*30+index+1);
      $node.find(".name").text(item.name);
      $node.find(".description").text(item.description);
      $node.find(".stars").text(item.stargazers_count+" stars");
      $node.find(".forks").text(item.forks+" forks");
      _this.content.append($node);
    });        
  },
}



var engi = {
  init: function(){
    var _this = this;
    this.isLoading = false;
    this.container = $(".content").eq(1);
    this.content = $(".content").eq(1).find(".container");
    this.pageIndex = 1;        
    this.bind();
    this.getData(this.pageIndex);
  },
  
  bind:function(){
    var _this = this;
    _this.container.on("scroll",function (){
      if(isBottom(_this.container, _this.content) && !_this.isLoading){
        $(".loading").show(400);             
         _this.getData(_this.pageIndex);  
      };
    })        
  },
  
  getData:function(pageIndex){
    var _this = this;
    _this.isLoading = true;
    $(".loading").show();
    // console.log("getdata function");
    $.ajax({
      url: "https://api.github.com/search/users?q=followers:>1000+language:javascript",
      method:"GET",
      data: {
        page:pageIndex
      }
    }).done(function(result){
      $(".loading").hide(400);
      _this.renderData(pageIndex,result);
      _this.isLoading = false;
      _this.pageIndex++;
      // console.log(_this.pageIndex);
      // console.log(result.total_count);
    });        
  },
  
  renderData:function(pageIndex,result) {
    var _this = this;
    // console.log("render function");
    result.items.forEach(function(item,index){
     var $node = $(
      `<div class="items">
        <div class="avatar">
          <img src="https://avatars0.githubusercontent.com/u/905434?v=4" alt="">  
        </div>
          <a href="https://github.com/ruanyf" target="_blank">
            <div class="login name">ruanyf</div>
          </a>
        </div>
      </div> `);
      $node.find("a").attr("href",item.html_url);
      $node.find("img").attr("src",item.avatar_url);
      $node.find(".login").text(item.login);
      _this.content.append($node);
    });        
  },
}


var search = {
  init: function(){
    var _this = this;
    this.isLoading = false;
    this.container = $(".content").eq(2);
    this.content = $(".content").eq(2).find(".container");
    this.pageIndex = 1;        
    this.bind();
  },
  
  bind:function(){
    var _this = this;
    _this.container.find("input[type=button]")
         .on("click", function(){
      // console.log("click");          
      _this.content.empty();
      _this.pageIndex = 1;
      _this.getData(function(result){
        _this.renderData(result);
      })
    });
    
    _this.container
         .find("input[type=text]")
         .on("keyup",function(e){
          if(e.key==='Enter'){
            _this.content.empty();
            _this.pageIndex = 1;
            _this.getData(function(result){
              _this.renderData(result);
            })
          }
    });
    
    _this.container.on("scroll",function (){
      if(isBottom(_this.container, _this.content) && !_this.isLoading){
        $(".loading").show(400);             
         _this.getData(function(result){
           _this.renderData(result);
         });
      };
    })        
  },
  
  getData:function(callback){
    var _this = this;
    var keyword  = this.container.find("input[type=text]").val();
    _this.isLoading = true;
    $(".loading").show();
    // console.log("getdata function");
    $.ajax({
      url: `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc&page=${_this.pageIndex}`,
      method:"GET",
      datatype:'jsonp'
    }).done(function(result){
      $(".loading").hide(400);
      callback(result);
      _this.isLoading = false;
      _this.pageIndex++;
    });        
  },
  
  renderData:function(result) {
    var _this = this;
    // console.log("render function");
    result.items.forEach(function(item,index){
     var $node = $(`
      <div class="items clearfix">
        <div class="index">
          <span>1</span>
        </div>
        <a href="" target="_blank"><div class="detail">
          <div class="name">react</div>
        </a>
        <div class="description">reafoea</div>
      </div>
      <div class="count">
        <span class="stars">134432 stars</span>
        <span class="forks">24232 forks</span>
      </div>
      </div>`);
      $node.find("a").attr("href",item.html_url);
      $node.find(".index span").text((_this.pageIndex-1)*30+index+1);
      $node.find(".name").text(item.name);
      $node.find(".description").text(item.description);
      $node.find(".stars").text(item.stargazers_count+" stars");
      $node.find(".forks").text(item.forks+" forks");
      _this.content.append($node);
      // console.log(_this.pageIndex);
    });        
  },      
}

var app = {      
  init:function() {
    proj.init();
    engi.init();
    search.init();
  },
}

app.init();