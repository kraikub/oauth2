import { connect, connection } from "mongoose";

class MongoDB {
  private connectionString: string;
  private isConnected: number;
  constructor(_connectionString?: string) {
    if (_connectionString === undefined) {
      console.error("Require MONGODB_URL as an environment variable.");
      process.exit(1);
    }
    this.connectionString = _connectionString;
    this.isConnected = 0;
  }

  public connect = async () => {
    console.log(this.connectionString)
    if (this.isConnected) return
    const db = await connect(this.connectionString).catch((err) => {
      console.error(err);
      process.exit(1);
    });
    this.isConnected = db.connections[0].readyState 
  };

  public close = async () => {
    await connection.close().catch((err) => {
      console.error(err);
      process.exit(1);
    });
  };
}

export const mongodb = new MongoDB(process.env.MONGODB_URL);
