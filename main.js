
import * as fs from 'node:fs/promises'
const filename = "config.ini";

fs.access(filename)
    .then(() => {
        fs.open(filename, 'r')
            .then(async file => {
                const leftColumn = [];
                const rightColumn = [];
                for await (let line of file.readLines()) {
                    const [key, value] = line.split('=');
                    if (key && value) {
                        leftColumn.push(key.trim());
                        rightColumn.push(value.trim());
                    }
                }
            console.log("left colum:" + leftColumn);
            console.log("right colum:" + rightColumn);
            })
    })
    .catch(async err => {
        console.log("File not found");
        let file = await fs.open(filename, 'w');
        file.close();
    })