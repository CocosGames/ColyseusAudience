import { Room, Client } from "colyseus";
import {MyRoomState, Player} from "./schema/MyRoomState";
import {MapSchema, Schema} from "@colyseus/schema";

export class PlayerRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    let s = new MyRoomState();
    this.setState(s);
    this.autoDispose = false;
    this.presence.publish("Movement", {"test":1});
    setTimeout(() => {
      this.presence.publish("Movement", 22)
    }, 1000);

    this.onMessage("type", (client, message) => {
      this.presence.publish("Movement", this.state);
    });

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
