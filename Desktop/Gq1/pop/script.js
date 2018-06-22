var holes = document.querySelectorAll('.hole');
var moles = document.querySelectorAll('.regMole');
var unique = document.querySelector('.special-cell')
var startBtn = document.querySelector('.button');
var begin = null;
var count = 0;

var RATE = 5/100; // decrease five percent

function maxTime(time, turn) {

  return time*Math.pow((1 - RATE), turn);
}

startBtn.addEventListener('click', function() {
    turns = 0;
    clicks = 0;
    startGame();
    localStorage.clear(); //
})

unique.addEventListener('click', function(){
  clicks += 1;
  console.log('CLICKED')

})

var turns = 0;
var clicks = 0;
function startGame() {
  begin = setInterval(function() {
    var skips = turns - clicks;
    document.querySelector('#skips span').innerText = skips;
    if ((skips) >= 3) {
      if (turns > localStorage.getItem('score', turns) || localStorage.getItem('score') === null) {
        localStorage.setItem('score', turns);
        alert(turns + " is the new HIGH SCORE!!!");
      }
      clearInterval(begin);
      console.log(begin);
    }


    popUp();


    turns += 1
  }, maxTime(2000, turns));
}

function popUp() {
  moveSpecialCell();
  var cells = getRandomCells()

  showAll(cells)

  // hides all cells in some random time
  hideAll(cells, _.random(1000, maxTime(2000, turns)))
}


function moveSpecialCell() {
  //  var time = _.random(100, 200);
    var cells = document.querySelectorAll('.cell');

    // grab parent cell
    var unique = document.querySelector('.special-cell');
    var randomCell = _.sample(cells);

    swapElements(unique, randomCell)
}

function getRandomCells() {
  var cells = document.querySelectorAll('.cell:not(.special-cell)');
  var special = document.querySelector('.special-cell');

  return _.sampleSize(cells, 4).concat(special)
}


function hideAll(cells, time) {
  setTimeout(function () {
    cells.forEach(function (cell) {
      cell.querySelector('.regMole').classList.remove('show')
    })
  }, time);
}

function showAll(cells) {
  cells.forEach(function (cell) {
    cell.querySelector('.regMole').classList.add('show')
  })
}


// StackOverflow swap elements:
function swapElements(obj1, obj2) {
    // save the location of obj2
    var parent2 = obj2.parentNode;
    var next2 = obj2.nextSibling;
    // special case for obj1 is the next sibling of obj2
    if (next2 === obj1) {
        // just put obj1 before obj2
        parent2.insertBefore(obj1, obj2);
    } else {
        // insert obj2 right before obj1
        obj1.parentNode.insertBefore(obj2, obj1);

        // now insert obj1 where obj2 was
        if (next2) {
            // if there was an element after obj2, then insert obj1 right before that
            parent2.insertBefore(obj1, next2);
        } else {
            // otherwise, just append as last child
            parent2.appendChild(obj1);
        }
    }
}
