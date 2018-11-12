<template>
  <div class="menu">
    <ul>
      <router-link to="/board" activeClass="active" tag="li" @click.native="setBoardEasy"><a> EASY</a></router-link>
      <router-link to="/board" activeClass="active" tag="li" @click.native="setBoardMedium"><a> MEDIUM</a></router-link>
      <router-link to="/board" activeClass="active" tag="li" @click.native="setBoardHard"><a> HARD</a></router-link>
      <router-link to="/board" activeClass="active" tag="li" @click.native="setBoardVeryHard"><a> VERY HARD</a></router-link>
      <app-board> </app-board>
    </ul>
  </div>
</template>

<script>
import Board from './Board.vue';

export default{
  components: {
    appBoard: Board
  },
  mounted() {
    let mySudokuJS = document.createElement('script')
    mySudokuJS.setAttribute('src', '/src/sudokuJS.js')
    document.head.appendChild(mySudokuJS)
  },
  methods: {
    // function to check the initialy generated values and make them readonly
    setEditable: function(){
      $('#sudoku input').each(function(){
        if(this.value!='')
        {
          $(this).prop("readonly", true);
        }
      });
    },
    // function that clears all error(red) cells and resets readonly values
    resetBoard: function(){
      $('#sudoku input').each(function(){
        $(this).prop("readonly", false);
        $(this).removeClass('board-cell--error');
      });
    },
    // following methods generate new board in different difficulty with resetting the previous board
    setBoardEasy(){
      this.resetBoard();
      mySudokuJS.generateBoard("easy");
      this.setEditable();
    },
    setBoardMedium(){
      this.resetBoard();
      mySudokuJS.generateBoard("medium");
      this.setEditable();
    },
    setBoardHard(){
      this.resetBoard();
      mySudokuJS.generateBoard("hard");
      this.setEditable();
    },
    setBoardVeryHard(){
      this.resetBoard();
      mySudokuJS.generateBoard("very-hard");
      this.setEditable();
    }
  }
}
</script>
