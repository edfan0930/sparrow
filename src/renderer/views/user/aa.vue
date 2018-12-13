<template>
    <div class="menu">
        <Menu ref="menu" v-if="MenuData" theme="light" :open-names="[OpenNameIndex]" :active-name="ActiveNameIndex" accordion="accordion" @on-select="Menuevents">
            <Submenu :name="index + 1" :key="index" v-for="(value, index) in MenuData">
                <template slot="title">
                    <Icon :type="value.icon"></Icon>
                    <span>{{value.name}}</span>
                </template>
                <MenuItem :name="Link.path" :key="index_" v-for="(Link, index_) in value.Items">{{ Link.name }}
                </MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
import { getScope } from '@/plugins/rbac';

export default {
  name: 'Menu',
  props: {
    MenuData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      OpenNameIndex: 1,
      ActiveNameIndex: '',
    };
  },
  created() {
    this.OpenName();
    this.ActiveName();
  },
  methods: {
    /**
     * 根據 router path, 打開Menu
     */
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
};
</script>
<style lang="scss" scoped>
  .menu{
    padding-top: 15px;
  }
</style>