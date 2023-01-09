<template>
  <main class="">
    <div id="container">
      <nav class="navbar navbar-expand-xxl navbar-dark bg-dark col-xs-6">
        <!-- <div class="container"> -->
          <router-link class="navbar-brand " to="/">
            <img src="./img/logo-1.png" width="145" height="70" alt="">
          </router-link>
          <!-- <select class="form-select form-bg-danger form-select-sm mt-1 mb-1 me-3" @change="selLangChange($event)" aria-label="Default select example"> -->
          <div>
            <select class="form-select form-select" @change="selLangChange($event)">
              <option>{{$t('main.lang_type')}}</option>
              <option value="ko" selected>한국어</option>
              <option value="en">English</option>
            </select>  
          </div>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <button v-if="user.email==undifined" class="btn btn-danger btn-sm" type="button" @click="kakaoLogin">{{$t('main.login')}}</button>
              <button v-else class="btn btn-danger btn-sm" type="button" @click="kakaoLogout">{{$t('main.login_out')}}</button>
              
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        <!-- </div> -->
      </nav>
      <router-view/>

      <footer class="mt-5 py-5 bg-dark">
          <div class="row">
            <div class="col-12 col-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
              <small class="d-block mb-3 text-muted">&copy; 2017–2021</small>
            </div>
            <div class="col-6 col-md">
              <h5>Features</h5>
              <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Cool stuff</a></li>
                <li><a class="link-secondary" href="#">Random feature</a></li>
                <li><a class="link-secondary" href="#">Team feature</a></li>
                <li><a class="link-secondary" href="#">Stuff for developers</a></li>
                <li><a class="link-secondary" href="#">Another one</a></li>
                <li><a class="link-secondary" href="#">Last time</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>Resources</h5>
              <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Resource name</a></li>
                <li><a class="link-secondary" href="#">Resource</a></li>
                <li><a class="link-secondary" href="#">Another resource</a></li>
                <li><a class="link-secondary" href="#">Final resource</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>Resources</h5>
              <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Business</a></li>
                <li><a class="link-secondary" href="#">Education</a></li>
                <li><a class="link-secondary" href="#">Government</a></li>
                <li><a class="link-secondary" href="#">Gaming</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>About</h5>
              <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Team</a></li>
                <li><a class="link-secondary" href="#">Locations</a></li>
                <li><a class="link-secondary" href="#">Privacy</a></li>
                <li><a class="link-secondary" href="#">Terms</a></li>
              </ul>
            </div>
          </div>
      </footer>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      lang : "",
      lanTp: ""      
    }
  },
  computed : {
    user() {
      return this.$store.state.user;
    }
  },
  created(){
    this.getLangChange()
  },
  methods : {
    getLangChange() {
      let locale = navigator.language || navigator.userLanguage
      locale = locale.substring(0, 2)
      if (locale !== 'ko') locale = 'en' // 한국어가 아닌 경우 무조건 영어로 설정
      this.$i18n.locale = locale
      // this.lang = locale;
      this.lang = "ko";
      
      
    },
    selLangChange(event){
      let lang = event.target.value;
      if(lang == 'en') {
        this.$i18n.locale = lang;
        this.lanTp = "ENG";
      } 
      else if(lang == 'ko') {
        this.$i18n.locale = lang;
        this.lanTp = "KOR";
        
      } else {
        this.lanTp = "KOR";
      }
      console.log("this.lanTp43 :",this.$i18n.locale);
      console.log("this.lanTp44 :",this.lanTp);
      this.$router.push({path: "/"});
      
      

    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname,profile_image, account_email, gender',
        success: this.getProfile
      });
    },
    
    getProfile(authObj) {
      console.log("authObj :",authObj);
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account;
          console.log("kakao_account :" ,kakao_account);
          console.log("kakao_account.email :" ,kakao_account.email);
          this.login(kakao_account);
          this.$router.push({path: '/', query:{admCnt1:this.admCnt}});
        }
      })
    },
    async login(kakao_account) {
      console.log("kakao_account :", kakao_account);
      await this.$api("/api/login" , {
        param : [
          {
            mem_email:kakao_account.email,
            mem_nick:kakao_account.profile.nickname,
            mem_profile_path:kakao_account.profile.profile_image_url,
            mem_sns: 'kakao'
          },
          {
            mem_nick:kakao_account.profile.nickname
          }
        ]        
      });
      this.$store.commit("user", kakao_account);
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((response) => {
        console.log(response);
        this.$store.commit("user", {});
        alert("로그아웃");
      });
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}





</style>

