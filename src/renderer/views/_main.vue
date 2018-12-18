<style scoped>

    .ivu-layout{
        height: 100%;
    }    
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu :active-name="ActiveNameIndex" theme="dark" width="auto" 
                :class="menuitemClasses" @on-select="Menuevents" :open-names="[OpenNameIndex]">
                    <Submenu :name="index + 1" :key="index" v-for="(value, index) in MenuData">
                        <template slot="title">
                            <Icon :type="value.icon"></Icon>
                            <span>{{value.name}}</span>
                        </template>
                        <MenuItem :name="Link.path" :key="index_" v-for="(Link, index_) in value.Items">{{ Link.name }}
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        name:   'Menu',
        data () {
            return {
                isCollapsed: true,
                OpenNameIndex: 1,
                ActiveNameIndex: '',
            }
        },
        created() {
            this.OpenName();
            this.ActiveName();
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            OpenName() {
              this.MenuData.forEach((v, i) => {
                if (this.$route.path.includes(v.path)) {
                   this.OpenNameIndex = i + 1;
                }
              });
              this.$nextTick(() => {
                // this.$refs.menu.$children[this.OpenNameIndex - 1].opened = true;
                this.$refs.menu.$children.forEach((item, index) => {
                  if (index === (this.OpenNameIndex - 1)) item.opened = true;
                  else item.opened = false;
                });
              });
            },
            /**
             * 指向頁面
             */
            ActiveName() {
              this.MenuData.forEach(v => {
                v.Items.forEach(v_ => {
                  if (this.$route.path.includes(v_.path)) {
                    this.ActiveNameIndex = v_.path;
                  }
                });
              });
            },
            /**
             * 前往頁面
             */
            Menuevents(name) {
                console.log("in",name)
              this.$router.push({
                path: name,
              });
            },
          },
          watch: {
            $route() {
              this.OpenName();
              this.ActiveName();
            },
          },    
    }
</script>