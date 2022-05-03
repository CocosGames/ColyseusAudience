import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class AudienceRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    // this.setState(new MyRoomState());
    this.autoDispose = false;
    this.presence.subscribe("Movement", this.onMovement);

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });

  }

  onMovement(data:any)
  {
    this.state = data;
    console.log(data);
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
