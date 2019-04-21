const students = ["jane", "robert", "zabata", "blackguy", "rich dotcom"];

const tablesX = 1;

const tablesY = 2;

function printTables(x, y, students) {
  var myGrid = [...Array(x)].map(e => Array(y));

  for (let i = 0; i < myGrid.length; i++) {
    for (let j = 0; j < myGrid[i].length; j++) {
      if (students.length > 0) {
        const student = students.pop();
        myGrid[i][j] = student;
      } else {
        myGrid[i][j] = "EMPTY";
      }
    }
  }
  console.log(myGrid);
}

printTables(tablesX, tablesY, students);
