import * as fs from 'node:fs/promises';

export default class UserController {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }

    async index(request, response, id) {
        const groupsHtml = await this.makeGroupsHtml();
        await this.layout(response, `<h1>User Controller</h1>${groupsHtml}`);
    }

    async signup(request, response, id) {
        await this.layout(response, "<h1>Реєстрація користувача</h1>");
    }

    async layout(response, main) {
        const file = await fs.open("layout.html", "r");
        let html = (await file.readFile()).toString();
        file.close();
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        });
        response.end(html.replace('{{main}}', main));
    }

    async makeGroupsHtml() {
        const [data] = await this.dbPool.query('SELECT * FROM `groups`');
        let wasChild;
        do {
            wasChild = false;
            for (let i = 0; i < data.length; i++) {
                let grp = data[i];
                if (grp["parent_id"] != null) {
                    wasChild = true;
                    let parent = this.findParent(data, grp["parent_id"]);
                    if (typeof parent.sub == 'undefined') {
                        parent.sub = [];
                    }
                    parent.sub.push(grp);
                    data.splice(i, 1);
                }
            }
        } while (wasChild);

        return this.grpToHtml(data);
    }

    grpToHtml(grps) {
        let html = "<ul>";
        for (let grp of grps) {
            html += `<li>${grp.name}`;
            if (typeof grp.sub != 'undefined' && grp.sub.length > 0) {
                html += this.grpToHtml(grp.sub);
            }
            html += '</li>';
        }
        html += '</ul>';
        return html;
    }

    findParent(arr, parent_id) {
        for (let elem of arr) {
            if (elem.id == parent_id) return elem;
            if (typeof elem.sub != 'undefined') {
                let p = this.findParent(elem.sub, parent_id);
                if (p != null) return p;
            }
        }
        return null;
    }
};