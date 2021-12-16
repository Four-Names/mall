<template>
  <nav-bar class="line" :class="isSticky">
    <div slot="left" class="btn" @click="back">
      <img src="~assets/img/common/left-arrow.svg" alt="" />
    </div>
    <slot slot="center" name="content" />

    <div slot="right" class="btn">
      <img src="~assets/img/common/menu.svg" alt="" @click="menu" />
      <div v-show="showMenu" class="main">
        <div class="triangle"></div>
        <div class="menu">
          <div class="row" @click="$router.push('/home')" v-if="home">
            <img src="~assets/img/menu/home.svg" alt="首页" class="icon" />
            <div class="desc">首页</div>
          </div>
          <div class="row" @click="$router.push('/category')" v-if="category">
            <img
              src="~assets/img/menu/search.svg"
              alt="分类搜索"
              class="icon"
            />
            <div class="desc">分类搜索</div>
          </div>
          <div class="row" @click="$router.push('/cart')" v-if="cart">
          
            <img src="~assets/img/menu/cart.svg" alt="购物车" class="icon" />
            <div class="desc">购物车</div>
          </div>
          <div class="row" @click="$router.push('/my/viewed')" v-if="viewed">
            <img
              src="~assets/img/menu/viewed.svg"
              alt="浏览记录"
              class="icon"
            />
            <div class="desc">浏览记录</div>
          </div>
          <div class="row" @click="$router.push('/my/setting')" v-if="setting">
            <img
              src="~assets/img/menu/setting.svg"
              alt="账户设置"
              class="icon"
            />
            <div class="desc">账户设置</div>
          </div>
          <div class="row" @click="$router.push('/my/collect')" v-if="collect">
            <img
              src="~assets/img/menu/collect.svg"
              alt="我的收藏"
              class="icon"
            />
            <div class="desc">我的收藏</div>
          </div>
          <div class="row" @click="$router.push('/my')" v-if="my">
            <img src="~assets/img/menu/my.svg" alt="个人中心" class="icon" />
            <div class="desc">个人中心</div>
          </div>
        </div>
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "./NavBar";

export default {
  components: { NavBar },
  props: {
    home: {
      type: Boolean,
      default() {
        return false;
      },
    },
    category: {
      type: Boolean,
      default() {
        return false;
      },
    },
    cart: {
      type: Boolean,
      default() {
        return false;
      },
    },
    viewed: {
      type: Boolean,
      default() {
        return false;
      },
    },
    setting: {
      type: Boolean,
      default() {
        return false;
      },
    },
    collect: {
      type: Boolean,
      default() {
        return false;
      },
    },
    my: {
      type: Boolean,
      default() {
        return false;
      },
    },
    sticky: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    menu(e) {
      e.stopPropagation();
      this.showMenu = !this.showMenu;
      let fun = (e) => {
        e.stopPropagation();
        this.showMenu = !this.showMenu;
        window.removeEventListener("click", fun);
      };
      window.addEventListener("click", fun, false);
    },
  },
  computed: {
    isSticky() {
      return this.sticky ? "sticky" : "";
    },
  },
  deactivated() {
    this.showMenu = false;
  },
};
</script>
<style scoped>



.btn {
  display: flex;
  width: 60px;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 11;
}

.sticky {
  position: fixed;
  top: 0;
  z-index: 11;
}

.triangle {
  top: 5vh;
  right: 22px;
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom: 8px solid rgba(25, 25, 25, 0.9);
  z-index: 11;
}

.menu {
  top: calc(5vh + 16px);
  right: 10px;
  background-color: rgba(25, 25, 25, 0.9);
  padding: 10px 0;
  width: 120px;
  position: absolute;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 11;
}

.row {
  display: flex;
  height: 35px;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
}

.icon {
  width: 26px;
}

.desc {
  color: white;
  width: 80px;
  font-size: 14px;
}
.line {
  border-bottom: 1px solid rgb(229, 229, 229);
}
</style>