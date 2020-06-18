Vue.component('tabs',{
    template:`\
    <div class = "tabs">\
    <div class = "tabs-bar">\
        <div \
        :class = "tabCls(item)"\
        v-for="(item,index) in navList"\
        @click = "handleChange(index)">\
        {{item.label}}\
        <span v-if = "ifShowClose(item)" class = "close-icon" @click.stop = "closeTap(index)"></span>\
    </div>\
    </div>\
    <div class = "tabs-content">\
    <slot></slot>\
    </div>\
    </div>`,
    props:{
        value:{
            type:[String , Number]
        }
    },
    data: function(){
        return{
            //渲染tabs的标题
            currentValue: this.value,
            navList:[]
        }
    },
    methods:{
        getTabs(){
            //遍历子组件，得到所有名为pane的组件
            return this.$children.filter(function(item){
                return item.$options.name === 'pane';
            });
        },
        updateNav(){
            this.navList=[];
            //设置对this的引用，在function回调里，this并不指向vue实例
            var _this = this;
            this.getTabs().forEach(function(pane,index){
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    closable: pane.closable
                });
                if(!pane.name) pane.name = index;
                if(index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus(){
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach(function(tab){
                return tab.show = tab.name === _this.currentValue;
            })
        },
        tabCls:function(item){
            return [
                'tabs-tab',
                {
                    //给选中的tab加一个class
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        //点击标题触发
        handleChange:function(index){
            var nav = this.navList[index];
            var name = nav.name
            //改变当前选中的tab，并触发watch
            this.currentValue = name;
            //更新value
            this.$emit('input',name);
            //触发自定义事件，供父级使用
            //this.$emit('on-click',name);
        },
        ifShowClose(item){
            return item.closable;
        },
        closeTap(index){
            if(this.navList[index].name === this.currentValue){
                let toIndex = index + 1;
                toIndex = toIndex < this.navList.length ? toIndex : 0;
                console.log(toIndex);
                this.currentValue = this.navList[toIndex].name;
            }
            this.navList.splice(index,1);
        }
        
    },
    watch:{
        value:function(val){
            this.currentValue = val;
        },
        currentValue:function(){
            //选中的tab变化时，更新pane的显示状态
            this.updateStatus();
        }
    }
})