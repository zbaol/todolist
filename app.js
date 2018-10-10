var storage = {
  //存入方法
  save:function(key,val){
    return localStorage.setItem(key,JSON.stringify(val))
  },
  //读取方法
  get:function(key){
    return JSON.parse(localStorage.getItem(key))|| []
  }
}
var app=new Vue({
  el:"#todolist",
  data:{
    //用来存储添加内容
    addInp:"",
    //根据border的值确定方框在哪个上面
    border:1,
    //
    listItems:storage.get("list"),
      // {
      //   title:"学习Vue框架",
      //   //判断该任务是否被完成
      //   iscomplete:false,
      //   //判断该任务是否被编辑
      //   isediting:false,
      //   //存储要改变之前的title
      //   beforeEdit:"学习Vue框架",
      //   //判断该任务是否被显示
      //   // show:true
      // }
  },
  watch:{
    listItems:{
      handler:function(){
        storage.save("list",this.listItems);
      },
      deep:true
    }
  },
  methods:{
    //添加事件
    add:function(){
      //判断内容是否为空，如为空，则不能添加内容
      if(this.addInp==""){

      }else{
        this.listItems.push({title:this.addInp,iscomplete:false,isediting:false,beforeEdit:this.addInp,show:true}),
        this.addInp=""
      }
    },
    //删除事件，splice（index，1）是从index开始删除，删除一个
    del:function(index){
      this.listItems.splice(index,1);
    },
    //双击事件，双击变为编辑状态
    dblclick:function(index){
     this.listItems[index].isediting=true;
    },
    //结束编辑状态
    end:function(index){
     this.listItems[index].isediting=false;
    },
    //撤销，esc撤销编辑
    back:function(index){
      this.listItems[index].title=this.listItems[index].beforeEdit;
      this.listItems[index].isediting=false;
    },
    click:function(index){
      this.listItems[index].iscomplete=!this.listItems[index].iscomplete
    },
    change:function(v){
      this.border=v;
    }
    //
    // unfinished:function(){
    //   this.border=2;
    //   for(let i=0;i<this.listItems.length;i++){
    //     this.listItems[i].show=true;
    //     if(this.listItems[i].iscomplete==true){
    //         this.listItems[i].show=false;
    //     }
    //   }
    // },
    // finished:function(){
    //   this.border=3;
    //   for(let i=0;i<this.listItems.length;i++){
    //     this.listItems[i].show=true;
    //     if(this.listItems[i].iscomplete!=true){
    //         this.listItems[i].show=false;
    //     }
    //   }
    // },
    // all:function(){
    //   this.border=1;
    //   for(let i=0;i<this.listItems.length;i++){
    //     this.listItems[i].show=true;
    //   }
    // }
  },
  directives:{
    focus:{
      update:function(el,binding){
        if(binding.value){
          el.focus();
        }
      }
    }
  },
  computed:{
    //返回未完成的任务的数组的长度
    num:function(){
       return this.listItems.filter(function(item){
         return !item.iscomplete;
       }).length
    },
    list:function(){
      if(this.border==1){
        return this.listItems
      }else if(this.border==2){
        return this.listItems.filter(x => !x.iscomplete)
      }else{
        return this.listItems.filter(x => x.iscomplete)
      }
    }
  }
})
