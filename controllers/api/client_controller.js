export default class clientController {
    doGet(request, response, id) {
        response.writeHead(200);
        response.end("clientController");
    }

    doPost(request, response, id) {
        response.writeHead(200,
            {
                'Content-Type': 'application/json'
            });
        response.end(JSON.stringify({
            "controller": "ClientController",
            "method": "POST"
        }));
    }

    doPut(request, response, id)
    {
        response.writeHead(200,{
            "Content-Type": "application/json"
        });
        response.end(JSON.stringify({
            "controller": "ClientController",
            "method": "PUT"
        }));
    }

    doDelete(request, response, id)
    {
        
    }
}