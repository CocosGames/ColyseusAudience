import { Room, Client } from "colyseus";
import {MyRoomState, Player} from "./schema/MyRoomState";
import {MapSchema, Schema} from "@colyseus/schema";

export class PlayerRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    let s = new MyRoomState();
    this.setState(s);
    this.autoDispose = false;

    this.onMessage("move", (client, message) => {
      let player = this.state.players.get(client.id);
      player.x = message.x;
      player.y = message.y;
      this.state.players.set(client.id, player);
      this.presence.publish("update", this.state);
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    let player = new Player()
    player.x = Math.random()*700+100;
    player.y = Math.random()*400+100;
    this.state.players.set(client.id, player);
    this.presence.publish("update", this.state);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.id);
    this.presence.publish("update", this.state);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
