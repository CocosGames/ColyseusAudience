import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class AudienceRoom extends Room<MyRoomState> {

  data:any = {};
  onCreate (options: any) {
    this.autoDispose = false;
    this.presence.subscribe("update", (d:any)=>{
      console.log(d);
      this.data = d;
      this.broadcast("update", this.data);
    });

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.broadcast("update", this.data);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
