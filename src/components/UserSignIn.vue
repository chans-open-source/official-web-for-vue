<template>
  <section class="component-layout fix lt0 w100 h100"
           v-if="isShowSignIn"
           @click.self="hideSignIn">
    <section class="login-area left"
             :style="{left:areaLeft,top:areaTop,height:leftPathHeight}"
             ref="loginArea">
      <div class="left-path left"
           :style="{height:leftPathHeight}">
        <p>{{modeDescription}}您的账号</p>
      </div>
      <div class="right-path left"
           ref="rightPath"
           @keyup.enter="sign">
        <p class="switch-area"
           @click="onSwitch">
          <a :class="[mode===0?'active':'']"
             id="signIn"
             href="javascript:">登录</a>
          <a id="switch"
             href="javascript:">/</a>
          <a :class="[mode===1?'active':'']"
             id="signUp"
             href="javascript:">注册</a>
        </p>
        <table>
          <tr>
            <th colspan="11">用户名</th>
            <th class="gap"
                colspan="1">
            </th>
            <th colspan="11">登录密码</th>
          </tr>
          <tr>
            <td colspan="11">
              <Input type="text"
                     v-model="username"
                     clearable>
              </Input>
            </td>
            <td class="gap"
                colspan="1">
            </td>
            <td colspan="11">
              <Input type="password"
                     v-model="password"
                     clearable>
              </Input>
            </td>
          </tr>
          <tr>
            <td class="submit-area"
                colspan="23">
              <Button class="submit-btn"
                      size="large"
                      type="primary"
                      long
                      @click="sign">立即{{modeDescription}}
              </Button>
            </td>
          </tr>
        </table>
      </div>
    </section>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import MSignInInfo from '../model/MSignInInfo'
  import TextUtils from '../utils/TextUtils'

  export default {
    name: 'UserSignIn',
    data () {
      return {
        username: '',
        password: '',
        mode: 0,
        areaTop: '',
        areaLeft: '',
        leftPathHeight: ''
      }
    },
    components: {
    },
    methods: {
      ...mapActions(['hideSignIn', 'setSignInInfo']),
      onSwitch (e) {
        switch (e.target.id) {
          case 'signIn':
            this.mode = 0
            break
          case 'signUp':
            this.mode = 1
            break
          case 'switch':
            this.mode = (this.mode + 1) % 2
            break
        }
      },
      async sign () {
        const self = this
        const { username, password, mode } = self
        if (!TextUtils.check.username(username)) {
          self.showWarn(`请输入6~32位个字（只能包含英文、数字、中文）`)
        } else if (!TextUtils.check.password(password)) {
          self.showWarn(`请输入8~32位个字（英文大小写、数字的组合）`)
        } else if (mode === 0) {
          const res = await this.$apis.user.sign.in(username, password)
          if (res.code === 0) {
            self.onSignInSuccess(res.data)
          } else {
            self.showError(res.message)
          }
        } else if (mode === 1) {
          const res = await this.$apis.user.sign.up(username, password)
          if (res.code === 0) {
            self.onSignUpSuccess()
          } else {
            self.showError(res.message)
          }
        }
      },
      onSignInSuccess (data) {
        this.showSuccess('登录成功')
        this.username = this.password = ''
        this.setSignInInfo(new MSignInInfo(data))
        this.hideSignIn()
      },
      onSignUpSuccess () {
        this.showSuccess('注册成功')
        this.mode = 0
        this.sign()
      }
    },
    computed: {
      ...mapGetters({
        windowWidth: 'windowWidth',
        windowHeight: 'windowHeight',
        isShowSignIn: 'isShowSignIn'
      }),
      modeDescription () {
        return this.mode === 0 ? '登录' : '注册'
      }
    },
    watch: {
      async isShowSignIn (value) {
        if (value) {
          await this.$nextTick()
          if (!(this.areaTop && this.areaLeft && this.leftPathHeight)) {
            const areaElement = this.$refs.loginArea
            if (areaElement) {
              this.areaTop = `${(this.windowHeight - areaElement.offsetHeight) / 2}px`
              this.areaLeft = `${(this.windowWidth - areaElement.offsetWidth) / 2}px`
              this.leftPathHeight = `${this.$refs.rightPath.offsetHeight}px`
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/base";

  .component-layout {
    background-color: rgba(0, 0, 0, .5);

    .login-area {
      border-radius: 3px;
      overflow: hidden;
      display: inline-block;

      .left-path {
        background-color: $orange;
        color: white;
        width: 250px;
        padding: 30px;
        opacity: .75;
        display: flex;
        justify-content: center;

        p {
          font-size: 28px;
          display: flex;
          width: 250px;
          align-items: center;
          justify-content: center;
        }
      }

      .right-path {
        background-color: white;
        padding: 30px;

        .switch-area {
          font-size: 16px;
          margin-bottom: 30px;

          a:nth-child(2) {
            padding: 0 3px;
          }

          a.active {
            color: $orange;
            opacity: .8;
          }
        }

        table {
          th {
            text-align: left;
            font-size: 16px;
          }

          .submit-area {
            padding-top: 14px;

            .submit-btn {
              height: 48px;
              font-size: 16px;
            }
          }

          .gap {
            width: 20px;
          }
        }
      }
    }
  }

</style>
