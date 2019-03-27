<template>
  <section class="component-layout shadow-bottom">
    <section class="component-area">
      <ul class="menu-list">
        <li class="menu-item"
            v-for="(item,index) in NavMenu"
            :key="index">
          <router-link :to="item.url">{{item.label}}</router-link>
        </li>
      </ul>
      <div class="sign-layout">
        <Dropdown class="user-layout"
                  trigger="click"
                  v-if="isSignIn">
          <a href="javascript:">
            {{signInInfo.user.name}}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              <a href="/user/detail.html">个人资料</a>
            </DropdownItem>
            <DropdownItem>
              <a href="/user/article/list.html">我的文章</a>
            </DropdownItem>
            <DropdownItem>
              <a href="javascript:"
                 @click="signOut">退出登录</a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <a class="ghost-layout"
           href="javascript:"
           v-else
           @click="showSignIn">注册/登录</a>
      </div>
    </section>
  </section>
</template>

<script>
  import NavMenu from '../assets/js/nav-menu'
  import { Dropdown, DropdownMenu, DropdownItem, Icon } from 'iview'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Header',
    components: { Dropdown, DropdownMenu, DropdownItem, Icon },
    data () {
      return {
        NavMenu
      }
    },
    async created () {
      await this.$nextTick()
      await this.onSignInInfoUpdate()
    },
    methods: {
      ...mapActions(['showSignIn', 'showSignUp', 'setSignInInfo']),
      async onSignInInfoUpdate () {
        const self = this
        const { signInInfo } = self
        if (signInInfo) {
          const res = await this.$apis.user.detail(self.signInInfo.user.id)
          console.log(res)
        }
      },
      signOut () {
        this.setSignInInfo(null)
      }
    },
    computed: {
      ...mapGetters({
        signInInfo: 'signInInfo'
      }),
      isSignIn () {
        return !!this.signInInfo
      }
    },
    watch: {
      signInInfo () {
        this.onSignInInfoUpdate()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/base.scss";

  .component-layout {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: white;
    text-align: center;
    font-size: 14px;

    .component-area {
      padding: 0 24px;

      .menu-list {
        display: inline-block;
        font-weight: bold;

        .menu-item {
          padding: 0 24px;
          float: left;
          height: 50px;
          border-bottom: 2px solid transparent;
        }

        .menu-item:hover {
          background-color: ghostwhite;
          border-bottom-color: ghostwhite;
        }

        .menu-item.active {
          border-bottom-color: rgba(82, 82, 82, .5);
        }
      }

      .sign-layout {
        float: right;

        .ghost-layout {
          font-size: 12px;
        }

        .user-layout {
          font-size: 14px;
          line-height: 30px;
          display: inline-block;

          a {
            display: inline-block;
          }

          .ivu-dropdown-menu {
            .ivu-dropdown-item {
              font-size: 12px;
              line-height: 32px;
            }
          }
        }
      }
    }
  }
</style>
