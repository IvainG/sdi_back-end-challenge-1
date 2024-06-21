import inquirer from "inquirer";

const seatOptions = [
  { size: "Small", capacity: 5, cost: 5000 },
  { size: "Medium", capacity: 10, cost: 8000 },
  { size: "Large", capacity: 15, cost: 12000 },
];

const calculateOptimizedCost = (seats) => {
  let remainingSeats = seats;
  let totalCost = 0;
  let breakdown = "";

  // Sort seat options by cost per seat in ascending order
  seatOptions.sort((a, b) => a.cost / a.capacity - b.cost / b.capacity);

  for (let option of seatOptions) {
    // the loop will break if there are no more remaining seats
    if (remainingSeats <= 0) break;
    const numUnits = Math.floor(remainingSeats / option.capacity);
    remainingSeats -= numUnits * option.capacity;
    totalCost += numUnits * option.cost;
    if (numUnits > 0) {
      breakdown += `${option.size} x ${numUnits} `;
    }
  }

  // If there are any remaining seats, use the smallest unit available
  if (remainingSeats > 0) {
    const smallestOption = seatOptions[0];
    totalCost += smallestOption.cost;
    breakdown += `${smallestOption.size} x 1`;
  }

  return { totalCost, breakdown };
};

const main = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "number",
      message: "Please input number (seat)",
      validate: (input) => {
        const number = parseInt(input, 10);
        return isNaN(number) || number <= 0
          ? "Please enter a valid number of seats."
          : true;
      },
    },
  ]);

  const seats = parseInt(answer.number, 10);
  const { totalCost, breakdown } = calculateOptimizedCost(seats);

  console.log(`Your seat number is ${seats}`);
  console.log(`Optimal allocation: ${breakdown}`);
  console.log(`Total cost: PHP ${totalCost}`);
};

main();
