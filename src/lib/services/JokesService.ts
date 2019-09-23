const fs = require('fs');

let rawdata = fs.readFileSync(`${__dirname}/../../data/reddit_jokes.json`); //Source: https://github.com/taivop/joke-dataset
let jokes: any[] = JSON.parse(rawdata);

const getRandomInt = (
    max: number,
    min: number = 1, // min and max included
) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export class JokesService {
    public static getRandomJoke() {
        const max = jokes.length;
        const rand = getRandomInt(1, max - 1);
        return jokes[rand];
    }
}