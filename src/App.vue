<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div class="template-form" v-show="getPage === 1">
      <div class="template-form__container">
        <div>
          <h2 class="">Template Inputs</h2>
          <hr>
          <InputGroup />
        </div>
        <div>
          <button class="proceed-button btn btn-info" @click="nextPage">Proceed</button>
        </div>
      </div>
    </div>
    <div v-show="getPage === 2">
      <div class="maintab-contrainer">
        <ul class="nav nav-tabs" id="all-apps" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
              <svg class="icon" width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1732 6.51022C10.1044 6.34708 10.0308 6.18669 9.93743 6.02503C9.8441 5.86337 9.74199 5.71945 9.63512 5.57828L10.1854 4.2145C10.2346 4.09102 10.1842 3.94891 10.0668 3.87725L8.166 2.78112C8.04855 2.70946 7.8982 2.74554 7.81556 2.84397L6.90613 4.00301C6.54907 3.95556 6.19221 3.95239 5.83354 4.00097L4.92538 2.84527C4.84523 2.73939 4.69597 2.71145 4.5771 2.78008L2.67518 3.87815C2.55631 3.94678 2.50587 4.09002 2.55749 4.21237L3.10428 5.57671C2.88287 5.86304 2.70994 6.17843 2.56975 6.50662L1.11128 6.71469C0.977215 6.73504 0.878297 6.8492 0.881634 6.98675L0.880508 9.18095C0.879089 9.32125 0.981738 9.43316 1.11326 9.45232L2.56948 9.65763C2.63831 9.82076 2.71463 9.98591 2.80522 10.1428C2.89581 10.2997 3.00067 10.4484 3.10754 10.5896L2.55723 11.9533C2.50806 12.0768 2.55841 12.2189 2.67586 12.2906L4.57666 13.3867C4.69411 13.4584 4.84445 13.4223 4.9271 13.3239L5.83652 12.1648C6.19358 12.2123 6.55044 12.2155 6.90912 12.1669L7.81727 13.3226C7.89742 13.4285 8.04669 13.4564 8.16556 13.3878L10.0675 12.2897C10.1863 12.2211 10.2368 12.0778 10.1852 11.9555L9.63837 10.5911C9.85979 10.3048 10.0327 9.98942 10.1729 9.66123L11.6314 9.45316C11.7654 9.43281 11.8644 9.31864 11.861 9.18109L11.8621 6.98689C11.8588 6.84934 11.7609 6.73469 11.6294 6.71553L10.1732 6.51022ZM7.33214 9.74811C6.41447 10.2779 5.23697 9.96242 4.70715 9.04474C4.17732 8.12706 4.49283 6.94956 5.41051 6.41974C6.32819 5.88992 7.50569 6.20543 8.03551 7.12311C8.56533 8.04078 8.24982 9.21828 7.33214 9.74811Z" stroke="#333333" stroke-width="0.5"/>
                <path d="M15.7106 4.01422C15.7216 3.92637 15.7298 3.83853 15.7298 3.74519C15.7298 3.65185 15.7216 3.56401 15.7106 3.47616L16.2898 3.0232C16.342 2.98203 16.3557 2.90791 16.3228 2.84751L15.7737 1.89768C15.7408 1.83728 15.6667 1.81532 15.6063 1.83728L14.9227 2.1118C14.78 2.00199 14.6262 1.9114 14.4588 1.84277L14.3545 1.1153C14.3462 1.04941 14.2886 1 14.22 1H13.1219C13.0532 1 12.9956 1.04941 12.9874 1.1153L12.883 1.84277C12.7156 1.9114 12.5619 2.00474 12.4191 2.1118L11.7356 1.83728C11.6724 1.81258 11.601 1.83728 11.5681 1.89768L11.0191 2.84751C10.9834 2.90791 10.9998 2.98203 11.052 3.0232L11.6312 3.47616C11.6203 3.56401 11.612 3.6546 11.612 3.74519C11.612 3.83578 11.6203 3.92637 11.6312 4.01422L11.052 4.46717C10.9998 4.50835 10.9861 4.58247 11.0191 4.64287L11.5681 5.5927C11.601 5.65309 11.6752 5.67506 11.7356 5.6531L12.4191 5.37858C12.5619 5.48838 12.7156 5.57897 12.883 5.6476L12.9874 6.37508C12.9956 6.44096 13.0532 6.49038 13.1219 6.49038H14.22C14.2886 6.49038 14.3462 6.44096 14.3545 6.37508L14.4588 5.6476C14.6262 5.57897 14.78 5.48564 14.9227 5.37858L15.6063 5.6531C15.6694 5.6778 15.7408 5.65309 15.7737 5.5927L16.3228 4.64287C16.3557 4.58247 16.342 4.50835 16.2898 4.46717L15.7106 4.01422ZM13.6709 4.706C13.1411 4.706 12.7101 4.27501 12.7101 3.74519C12.7101 3.21537 13.1411 2.78437 13.6709 2.78437C14.2007 2.78437 14.6317 3.21537 14.6317 3.74519C14.6317 4.27501 14.2007 4.706 13.6709 4.706Z" stroke="#333333" stroke-width="0.5"/>
              </svg>
              <p class="tab-name">
                Presentation
              </p>

            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
              <svg class="icon" width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1732 6.51022C10.1044 6.34708 10.0308 6.18669 9.93743 6.02503C9.8441 5.86337 9.74199 5.71945 9.63512 5.57828L10.1854 4.2145C10.2346 4.09102 10.1842 3.94891 10.0668 3.87725L8.166 2.78112C8.04855 2.70946 7.8982 2.74554 7.81556 2.84397L6.90613 4.00301C6.54907 3.95556 6.19221 3.95239 5.83354 4.00097L4.92538 2.84527C4.84523 2.73939 4.69597 2.71145 4.5771 2.78008L2.67518 3.87815C2.55631 3.94678 2.50587 4.09002 2.55749 4.21237L3.10428 5.57671C2.88287 5.86304 2.70994 6.17843 2.56975 6.50662L1.11128 6.71469C0.977215 6.73504 0.878297 6.8492 0.881634 6.98675L0.880508 9.18095C0.879089 9.32125 0.981738 9.43316 1.11326 9.45232L2.56948 9.65763C2.63831 9.82076 2.71463 9.98591 2.80522 10.1428C2.89581 10.2997 3.00067 10.4484 3.10754 10.5896L2.55723 11.9533C2.50806 12.0768 2.55841 12.2189 2.67586 12.2906L4.57666 13.3867C4.69411 13.4584 4.84445 13.4223 4.9271 13.3239L5.83652 12.1648C6.19358 12.2123 6.55044 12.2155 6.90912 12.1669L7.81727 13.3226C7.89742 13.4285 8.04669 13.4564 8.16556 13.3878L10.0675 12.2897C10.1863 12.2211 10.2368 12.0778 10.1852 11.9555L9.63837 10.5911C9.85979 10.3048 10.0327 9.98942 10.1729 9.66123L11.6314 9.45316C11.7654 9.43281 11.8644 9.31864 11.861 9.18109L11.8621 6.98689C11.8588 6.84934 11.7609 6.73469 11.6294 6.71553L10.1732 6.51022ZM7.33214 9.74811C6.41447 10.2779 5.23697 9.96242 4.70715 9.04474C4.17732 8.12706 4.49283 6.94956 5.41051 6.41974C6.32819 5.88992 7.50569 6.20543 8.03551 7.12311C8.56533 8.04078 8.24982 9.21828 7.33214 9.74811Z" stroke="#333333" stroke-width="0.5"/>
                <path d="M15.7106 4.01422C15.7216 3.92637 15.7298 3.83853 15.7298 3.74519C15.7298 3.65185 15.7216 3.56401 15.7106 3.47616L16.2898 3.0232C16.342 2.98203 16.3557 2.90791 16.3228 2.84751L15.7737 1.89768C15.7408 1.83728 15.6667 1.81532 15.6063 1.83728L14.9227 2.1118C14.78 2.00199 14.6262 1.9114 14.4588 1.84277L14.3545 1.1153C14.3462 1.04941 14.2886 1 14.22 1H13.1219C13.0532 1 12.9956 1.04941 12.9874 1.1153L12.883 1.84277C12.7156 1.9114 12.5619 2.00474 12.4191 2.1118L11.7356 1.83728C11.6724 1.81258 11.601 1.83728 11.5681 1.89768L11.0191 2.84751C10.9834 2.90791 10.9998 2.98203 11.052 3.0232L11.6312 3.47616C11.6203 3.56401 11.612 3.6546 11.612 3.74519C11.612 3.83578 11.6203 3.92637 11.6312 4.01422L11.052 4.46717C10.9998 4.50835 10.9861 4.58247 11.0191 4.64287L11.5681 5.5927C11.601 5.65309 11.6752 5.67506 11.7356 5.6531L12.4191 5.37858C12.5619 5.48838 12.7156 5.57897 12.883 5.6476L12.9874 6.37508C12.9956 6.44096 13.0532 6.49038 13.1219 6.49038H14.22C14.2886 6.49038 14.3462 6.44096 14.3545 6.37508L14.4588 5.6476C14.6262 5.57897 14.78 5.48564 14.9227 5.37858L15.6063 5.6531C15.6694 5.6778 15.7408 5.65309 15.7737 5.5927L16.3228 4.64287C16.3557 4.58247 16.342 4.50835 16.2898 4.46717L15.7106 4.01422ZM13.6709 4.706C13.1411 4.706 12.7101 4.27501 12.7101 3.74519C12.7101 3.21537 13.1411 2.78437 13.6709 2.78437C14.2007 2.78437 14.6317 3.21537 14.6317 3.74519C14.6317 4.27501 14.2007 4.706 13.6709 4.706Z" stroke="#333333" stroke-width="0.5"/>
              </svg>
              <p class="tab-name">
                Estimation
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">
              <svg class="icon" width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1732 6.51022C10.1044 6.34708 10.0308 6.18669 9.93743 6.02503C9.8441 5.86337 9.74199 5.71945 9.63512 5.57828L10.1854 4.2145C10.2346 4.09102 10.1842 3.94891 10.0668 3.87725L8.166 2.78112C8.04855 2.70946 7.8982 2.74554 7.81556 2.84397L6.90613 4.00301C6.54907 3.95556 6.19221 3.95239 5.83354 4.00097L4.92538 2.84527C4.84523 2.73939 4.69597 2.71145 4.5771 2.78008L2.67518 3.87815C2.55631 3.94678 2.50587 4.09002 2.55749 4.21237L3.10428 5.57671C2.88287 5.86304 2.70994 6.17843 2.56975 6.50662L1.11128 6.71469C0.977215 6.73504 0.878297 6.8492 0.881634 6.98675L0.880508 9.18095C0.879089 9.32125 0.981738 9.43316 1.11326 9.45232L2.56948 9.65763C2.63831 9.82076 2.71463 9.98591 2.80522 10.1428C2.89581 10.2997 3.00067 10.4484 3.10754 10.5896L2.55723 11.9533C2.50806 12.0768 2.55841 12.2189 2.67586 12.2906L4.57666 13.3867C4.69411 13.4584 4.84445 13.4223 4.9271 13.3239L5.83652 12.1648C6.19358 12.2123 6.55044 12.2155 6.90912 12.1669L7.81727 13.3226C7.89742 13.4285 8.04669 13.4564 8.16556 13.3878L10.0675 12.2897C10.1863 12.2211 10.2368 12.0778 10.1852 11.9555L9.63837 10.5911C9.85979 10.3048 10.0327 9.98942 10.1729 9.66123L11.6314 9.45316C11.7654 9.43281 11.8644 9.31864 11.861 9.18109L11.8621 6.98689C11.8588 6.84934 11.7609 6.73469 11.6294 6.71553L10.1732 6.51022ZM7.33214 9.74811C6.41447 10.2779 5.23697 9.96242 4.70715 9.04474C4.17732 8.12706 4.49283 6.94956 5.41051 6.41974C6.32819 5.88992 7.50569 6.20543 8.03551 7.12311C8.56533 8.04078 8.24982 9.21828 7.33214 9.74811Z" stroke="#333333" stroke-width="0.5"/>
                <path d="M15.7106 4.01422C15.7216 3.92637 15.7298 3.83853 15.7298 3.74519C15.7298 3.65185 15.7216 3.56401 15.7106 3.47616L16.2898 3.0232C16.342 2.98203 16.3557 2.90791 16.3228 2.84751L15.7737 1.89768C15.7408 1.83728 15.6667 1.81532 15.6063 1.83728L14.9227 2.1118C14.78 2.00199 14.6262 1.9114 14.4588 1.84277L14.3545 1.1153C14.3462 1.04941 14.2886 1 14.22 1H13.1219C13.0532 1 12.9956 1.04941 12.9874 1.1153L12.883 1.84277C12.7156 1.9114 12.5619 2.00474 12.4191 2.1118L11.7356 1.83728C11.6724 1.81258 11.601 1.83728 11.5681 1.89768L11.0191 2.84751C10.9834 2.90791 10.9998 2.98203 11.052 3.0232L11.6312 3.47616C11.6203 3.56401 11.612 3.6546 11.612 3.74519C11.612 3.83578 11.6203 3.92637 11.6312 4.01422L11.052 4.46717C10.9998 4.50835 10.9861 4.58247 11.0191 4.64287L11.5681 5.5927C11.601 5.65309 11.6752 5.67506 11.7356 5.6531L12.4191 5.37858C12.5619 5.48838 12.7156 5.57897 12.883 5.6476L12.9874 6.37508C12.9956 6.44096 13.0532 6.49038 13.1219 6.49038H14.22C14.2886 6.49038 14.3462 6.44096 14.3545 6.37508L14.4588 5.6476C14.6262 5.57897 14.78 5.48564 14.9227 5.37858L15.6063 5.6531C15.6694 5.6778 15.7408 5.65309 15.7737 5.5927L16.3228 4.64287C16.3557 4.58247 16.342 4.50835 16.2898 4.46717L15.7106 4.01422ZM13.6709 4.706C13.1411 4.706 12.7101 4.27501 12.7101 3.74519C12.7101 3.21537 13.1411 2.78437 13.6709 2.78437C14.2007 2.78437 14.6317 3.21537 14.6317 3.74519C14.6317 4.27501 14.2007 4.706 13.6709 4.706Z" stroke="#333333" stroke-width="0.5"/>
              </svg>
              <p class="tab-name">
                Project Setup
              </p>

            </a>
          </li>
        </ul>
        <div>

        </div>
        <div class="maintab__letters"> <!-- temporary class -->
          <span>E</span>
          <span>F</span>
          <span>G</span>
          <span>H</span>
        </div>
      </div>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div class="main-container">
            <!-- <div class="container"> -->
              <div class="presentation">
                <div class="presentation__chapters">
                  <Chapters />
                </div>
                <div class="presentation__templates">
                  <!-- <div class="presentation__back">
                    <button class="btn btn-warning" @click="page--">Back</button>
                  </div> -->
                  <DataSetForm />
                </div>
                <div class="presentation__toolbox">
                  <Toolbox />
                </div>
              </div>
          </div>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Estimation</div>
        <div class="tab-pane fade" id="contact" role="tabpanel" arias-labelledby="contact-tab">
          <div class="main-container">
            <Setup />
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import DataSetForm from './components/DataSetForm'
import Chapters from './components/Chapters'
import Toolbox from './components/Toolbox'
import InputGroup from './components/InputGroup'
import Setup from './components/setup/Setup'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    DataSetForm,
    Chapters,
    Toolbox,
    InputGroup,
    Setup
  },
  methods: {
    ...mapActions([
      'handlePage'
    ]),
    nextPage() {
      // let page = this.getPage
      this.handlePage(2)
    }
  },
  computed: {
    ...mapGetters([
      'getProjectName',
      'getVersionDate',
      'getProjectLogo',
      'getProjectImage',
      'getPage'
    ])
  },
}
</script>

<style>
body {
  margin: 0;
	padding: 0;
  height: 100%;
}

*, *::before, *::after {
  box-sizing: border-box;
}

p {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 14px;
}

input {
  padding: 5px;
  margin: 10px 10px 10px 0;
}

label {
 font-size: 14px;
}

.icon-x {
  background: #555 url('~@/assets/images/icons/x.svg') no-repeat;
  background-position: center;
}

.icon-plus {
  background: #555 url('~@/assets/images/icons/plus.svg') no-repeat;
  background-position: center;
}

.icon-up {
  background: #555 url('~@/assets/images/icons/up.svg') no-repeat;
  background-position: center;
}

.icon-down {
  background: #555 url('~@/assets/images/icons/down.svg') no-repeat;
  background-position: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #333;
  padding: .75em;
}
.main-container {
 /* height: 92vh; */
  /* overflow: hidden; */
  overflow: hidden;
  margin-top: 5px;
  display: flex;
}

.presentation, .setup {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-column-gap: 1em;
}

.presentation__chapters, .presentation__toolbox {
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 6px;
  height: calc(100vh - 73px);
}

/* Tabs customizations */
.maintab-contrainer .nav-tabs .nav-link {
  color: #333;
  font-size: 14px;
  width: 40px;
  white-space: nowrap;
  position: relative;

}

.maintab-contrainer .nav-tabs .nav-link.active {
  color: blue !important;
  font-weight: 500;
  width: 100%;
  transition: width .3s ease-in-out;
  border-color: #ddd #ddd #fff;
}

.icon {
  position: absolute;
  top: 30%;
  left: calc(50% - 10px);
}
/* .nav-tabs {
  border-bottom: 2px solid #ddd !important;
}

.nav-tabs .nav-item {
  margin-bottom: -2px !important;
}
.nav-tabs .nav-link {
  border-bottom: 2px solid #ddd !important;
} */
.maintab-contrainer .nav-tabs .nav-link > .tab-name {
  transform: scaleX(0);
  transform-origin: left;
  
}

.maintab-contrainer .nav-tabs .nav-link.active > .tab-name {
  color: blue;
  transform: scaleX(1);
  transition: transform .3s ease-in-out;
  display: inline-block;
}
.maintab-contrainer .nav-tabs .nav-link.active > .icon {
  position: unset;
  display: inline-block;
  margin-right: 5px;
}

.maintab-contrainer .nav-tabs .nav-link.active > .icon path {
  stroke: blue
} 

.maintab-contrainer .tab-name {
  white-space: nowrap;
}

.maintab-contrainer {
  position: relative;
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-column-gap: 1em;
}

.maintab-contrainer::after {
  content: '';
  background: #ddd;
  height: 1px;
  width: calc(100% - 250px);
  bottom: 0;
  right: 0;
  position: absolute;
}

.maintab__letters {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.maintab__letters span {
  border: 2px solid #333;
  border-radius: 3px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0 5px 5px;
}

.template-form {
  width: 100%;
  border: 2px solid #ddd;
  padding: 20px 0;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 97vh;
}

.template-form__container {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.proceed-button {
  margin: 5px 30px;
}



</style>
