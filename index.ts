import inquirer from "inquirer";

const answer = await inquirer.prompt([
  {
    type: "input",
    name: "number",
    message: "Please input number (seat)",
  },
]);

console.log("your set number is " + answer.number);
