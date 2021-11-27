const fs = require("fs");
const NameGen = require("./namegen");
const namegen = require("./namegen");

let animals = fs.readFileSync(__dirname + "/animals.txt", "utf-8");
let animalsList = animals.split("\n").map((j) => j.replace("\r", ""));

function startsWithVowel(string) {
  let vowels = ["a", "e", "i", "o", "u"];
  let ret = false;
  if (typeof string === "string") {
    vowels.forEach((v) => {
      if (string.startsWith(v)) ret = true;
    });
  }

  return ret;
}

function generate(characterName, needFirst) {
  let name = NameGen.compile("sV");

  let template = `${
    characterName ? characterName : name
  } is a mix of {$1} and {$2}`;

  let gen1 = animalsList[Math.floor(Math.random() * animalsList.length)];
  let gen2 = animalsList[Math.floor(Math.random() * animalsList.length)];

  if (needFirst && typeof needFirst === "string") {
    gen1 = needFirst;
  }

  if (startsWithVowel(gen1.toLowerCase())) {
    gen1 = `an ${gen1}`;
  } else gen1 = `a ${gen1}`;

  if (startsWithVowel(gen2.toLowerCase())) {
    gen2 = `an ${gen2}`;
  } else gen2 = `a ${gen2}`;
  let ret = template.replace("{$1}", gen1).replace("{$2}", gen2);

  ret = ret[0].toUpperCase() + ret.slice(1);

  return ret;
}

console.log(generate(undefined, "Dragon"));
