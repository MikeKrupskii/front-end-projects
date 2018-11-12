<template>
  <div id="app">
    <div class="wrap">
      <app-header ></app-header>
      <div class="menuMain" v-bind:class="{hide: !menuVisible}">
        <div class="menu-content">
          <h1>Sudoku Project</h1>
          <div class="image-div">
            <a target="_blank" href="https://github.com/MikeKrupskii/front-end-projects/tree/master/sudoku">
              <img src="./assets/gitimage.png"/>
            </a>
          </div>
          <button class="startButton" id="menuButton" @click="startGame(); setEditable();">Start Game</button>
        </div>
      </div>
      <button id="menuButton" @click="showMenu">Back</button>
      <div style="clear:both;"></div>
      <router-view></router-view>
      <div id="sudoku" class="sudoku-board">
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Board from './components/Board.vue'
import jQuery from 'jquery'
let $ = require('jQuery')
export default {
  components:{
    appHeader: Header,
    appBoard: Board  // we don't need it yet
  },
  name: 'app',
  data: function() {
    return {
      menuVisible: true
    };
  },
  mounted() {
    let mySudokuJS = document.createElement('script')
    mySudokuJS.setAttribute('src', '/src/sudokuJS.js')
    document.head.appendChild(mySudokuJS)
    appHeader.setEditable();
  },
  methods:{
    startGame: function(){
      this.menuVisible = !this.menuVisible;
    },
    showMenu: function(){
      this.menuVisible=true;
    },
    // uses setEditable from child Header component
    setEditable: function(){
      this.$children[0].setEditable();
    }
  }
}

</script>

<style lang="scss">
body{
  background-color: #DCDCDC	;
  overflow-x: hidden;
}
/* styles for board */
.sudoku-board {
  min-height: 22.75rem;
}
.sudoku-board-cell {
  display: inline-block;
  position: relative;
  border: 3px solid #ddd;
  background: white;
  max-width: 11.11111%;
}
[data-board-size="9"].sudoku-board .sudoku-board-cell:nth-of-type(9n+1){
  border-left-width: 2px;
  border-left-color: #808080;
}
[data-board-size="9"].sudoku-board .sudoku-board-cell:nth-of-type(n):nth-of-type(-n+9){
  border-top-width: 2px;
  border-top-color: #808080;
}
[data-board-size="9"].sudoku-board .sudoku-board-cell:nth-of-type(3n){
  border-right-width: 2px;
  border-right-color: #808080;
}
[data-board-size="9"].sudoku-board .sudoku-board-cell:nth-of-type(n+19):nth-of-type(-n+27),
[data-board-size="9"].sudoku-board .sudoku-board-cell:nth-of-type(n+46):nth-of-type(-n+54),
[data-board-size="9"].sudoku-board .sudoku-board-cell:nth-of-type(n+73):nth-of-type(-n+81){
  border-bottom-width: 2px;
  border-bottom-color: #808080;
}
.sudoku-board-cell input {
  background: none;
  color: #002137;
  font-size: 19.2px;
  font-size: 1.2rem;
  text-align: center;
  width: 2em;
  max-width: 100%;
  height: 2em;
  border: 0;
  position: relative;
  z-index: 1; /*on top of candidates*/
}
/*highlight new input in board cell*/
.sudoku-board-cell .highlight-val {
  color: #00d;
}
/*highligt incorrect input*/
.sudoku-board-cell .board-cell--error {
  background: #d00;
  color: #eee;
}
/*wrapper that hold the candidates for each cell*/
.sudoku-board-cell .candidates {
  display: none; /*hidden by default*/
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  text-align: center;
  font-size: .75em; /*1/3 /1.13 out of the 2*1.2em cell height*/
  letter-spacing: -.5px;
  font-family: monospace, sans-serif;
  /*use as justify grid*/
  line-height: 0;
  text-align: justify;
}
/* when board cells start to get narrower because of small screen,
reduce letter spacing for candidates to make them still fit*/
@media(max-width: 23em){
  .sudoku-board .candidates {
    letter-spacing: -2px;
  }
}
.showCandidates .candidates {
  display: block;
}
/*each candidate in each cell is wrapped in a div*/
.sudoku-board .candidates div {
  display: inline-block;
  width: 20%;
  line-height: 1.13;
  vertical-align: top;
  *display: inline;
  *zoom: 1;
}
/*.candidates div*/.candidate--highlight {
background-color: yellow;
}
/*.candidates div*/.candidate--to-remove {
background-color: red;
color: white;
}
/* Begin of menu styling */
.menu {
  overflow:hidden;
  float:right;
  text-align: center;
  margin: 0 auto;
}
.menu a{
  float: right;
  text-align: center;
  padding: 14px 16px;
  font-size: 22px;
  color: #002137;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  box-shadow: 0px 0px  rgba(255, 255, 255, 0);
  transition: box-shadow 0.6s ease;
  margin: 0.5em;
  cursor: pointer;
}
.menu a:hover{
  box-shadow: 0px 0px 0px 3px #002137 ;
}
.menu ul{
  list-style-type: none;
}
.menu li{
  float: left;
}
/* end of MENU STYLE */
/* begin of mainMenu style */
.menuMain {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.menuMain > div {
  position: absolute;
  width: 100%;
  text-align:center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.menuMain > div > .button {
  cursor: pointer;
}
.menu-content{
  position: absolute;
  top: 50%;
}
* {
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  user-select: none;
  cursor: default;
}
.menuMain {
  backdrop-filter: blur(3px);
}
/* animations */
.menuMain.hide {
  opacity:1;
  animation: hideMenu 1s forwards;
}
.menuMain.hide > div {
  animation: hideMenuContent 0.5s forwards;
}
@keyframes hideMenu {
  0% {
    backdrop-filter: blur(3px);
  }
  100% {
    backdrop-filter: blur(0px);
    opacity: 0;
    visibility: hidden;
  }
}
@keyframes hideMenuContent {
  100% {
    transform: translate3d(-50%, -50%, 0) scale3d(1.5, 1.5, 1);
    opacity: 0;
  }
}
/* end of menuMain styling */
.sudoku-board {
  position: absolute!important;
  top: 50%;
  left: 50%;
  min-width: 320px;
  min-height: 320px;
  transform: translate(-50%, -50%);
}
.app{
  position: relative;
}
/* button styling */
#menuButton {
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin-top: 2%;
  text-align:center;
  vertical-align: middle;
  background-color: #003f69;
  text-transform: uppercase;
  color: white;
  transition: box-shadow 0.2s ease-in-out;
}
#menuButton:hover {
  box-shadow: 0 0 3px #008FFF;
  cursor: pointer;
}
.startButton{
  width: 250px;
}
/* other elements */
h1 {
  text-transform: uppercase;
  text-align: center;
  color: #002137;
  font-size: 40px;
}
img:hover{
  opacity: 0.8;
  cursor: pointer;
}
.image-div{
  margin: 0 auto;
  width: 250px;
}

</style>
