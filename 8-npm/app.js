import validator from "validator";
import chalk from "chalk";

// console.log(validator.isEmail('fakmalpradana@gmail.com'));
// console.log(validator.isMobilePhone('08123456789','id-ID'));
console.log(validator.isNumeric('08123456789'));
console.log(chalk.blue.bgRed('halo'));

const pesan = `satu ${chalk.bgRed('dua')} tiga ${chalk.italic.green('empat')} lima`;
console.log(pesan);