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
            {{username}}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(item,index) in SignInMenu"
                          :key="index">
              <router-link :to="item.url">{{item.label}}</router-link>
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
  import { NavMenu, SignInMenu } from '../assets/js/nav-menu'
  import { mapActions, mapGetters } from 'vuex'
  import MUser from '../model/MUser'
  import MSignInInfo from '../model/MSignInInfo'

  export default {
    name: 'Header',
    components: {},
    data () {
      return {
        NavMenu,
        SignInMenu,
        user: null
      }
    },
    async created () {
      await this.$nextTick()
      await this.onSignInInfoUpdate()
    },
    methods: {
      ...mapActions(['showSignIn', 'showSignUp', 'setSignInInfo']),
      async onSignInInfoUpdate () {
        const { isSignIn, userId, needToUpdate } = this
        if (isSignIn && needToUpdate && !!userId) {
          const res = await this.$apis.user.detail(userId)
          const signInInfo = new MSignInInfo(this.signInInfo)
          signInInfo.setUser(new MUser(res.data))
          this.setSignInInfo(signInInfo)
        }
        this.updateSignInMenu()
      },
      signOut () {
        this.setSignInInfo(null)
      },
      updateSignInMenu () {
        if (this.isSignIn) {
          const userId = this.userId
          this.SignInMenu.forEach(item => {
            item.url = item.url.replace(':userId', userId)
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        signInInfo: 'signInInfo'
      }),
      isSignIn () {
        return !!this.signInInfo
      },
      nonNullUser () {
        return (this.signInInfo || {}).user || {}
      },
      needToUpdate () {
        return (Date.now() - this.lastUpdated) > 60000
      },
      lastUpdated () {
        const lastUpdated = this.nonNullUser.lastUpdated
        return isNaN(lastUpdated) ? 0 : lastUpdated
      },
      userId () {
        return this.nonNullUser.id
      },
      username () {
        return this.nonNullUser.username
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

          a {
            padding: 10px 0;
          }
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
