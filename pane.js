Vue.component('pane',{
    name: 'pane',
    template:`\
        <div :class = getCls()>\
        <slot></slot>\
        </div>`,
    data: function(){
        return{
            show: true
        }
    },
    props:{
        name:{
            type: String
        },
        label:{
            type: String,
            default: ''
        },
        closable:{
            type: Boolean,
            default: true
        }
    },
    methods:{
        updateNav(){
            this.$parent.updateNav()
        },
        getCls(){
            return[
                'pane',
                {
                    'pane-active': this.show
                }
            ]
        }
    },
    watch:{
        label(){
            this.updateNav()
        }
    },
    mounted(){
        this.updateNav();
    },
    beforeDestory(){
        this.updateNav();
    }
})