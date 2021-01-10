import { createServer, Response, Request } from 'miragejs';
import user from '../json/user.json';
import diary from '../json/diary.json';
//FIXED
import { Observable } from 'rxjs-compat';

export default function server() {
    let server = createServer({
        routes() {
            this.namespace = "api";


            this.get("/user", () => {//          /api/user
                return user;
            })

            this.get("/diary", () => {//         /api/diary
                return diary;
            })


            this.post("/newuser", (schema: any, req: Request): Response | Observable<number> => {
                user.push(JSON.parse(req.requestBody));
            })

            this.post("/newdiary", (schema: any, req: Request): Response | Observable<number> => {
                diary.push(JSON.parse(req.requestBody));
            })
        }
    })

    return server;
}