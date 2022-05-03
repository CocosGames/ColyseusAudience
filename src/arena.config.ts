import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";

/**
 * Import your Room files
 */
import { PlayerRoom } from "./rooms/PlayerRoom";
import {matchMaker, RedisPresence} from "colyseus";
import {AudienceRoom} from "./rooms/AudienceRoom";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('player_room', PlayerRoom);
        gameServer.define('audience_room', AudienceRoom);

    },

    options:{presence: new RedisPresence()},

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */

        let finished = 0;
        matchMaker.create("player_room").then((res)=>{
            matchMaker.create("audience_room").then((res2)=>{
                console.log(res.room.roomId, res2.room.roomId);
                // matchMaker.remoteRoomCall();
            })
        });



    }
});