
import * as fs from 'node:fs/promises'
const filename = "config.ini";

fs.access(filename)
    .then(() => {
        fs.open(filename, 'r')
            .then(async file => {
                const leftSide = [];
                const rightSide = [];
                for await (let line of file.readLines()) {
                    const [key, value] = line.split('=');
                    if (key && value) {
                        leftSide.push(key.trim());
                        rightSide.push(value.trim());
                    }
                }
            console.log("Left side:" + leftSide);
            console.log("Right side:" + rightSide);
            })
    })
    .catch(async err => {
        console.log("File not found");
        let file = await fs.open(filename, 'w');
        file.close();
    })