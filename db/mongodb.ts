import { connect, connection } from "mongoose"

class MongoDB {

    private connectionString: string

    constructor(_connectionString?: string) {
        if (_connectionString === undefined) {
            console.error("Require MONGODB_URL as an environment variable.")
            process.exit(1)
        }
        this.connectionString = _connectionString;
    }

    public connect = async () => {
        await connect(this.connectionString).catch(err => {
            console.error(err)
            process.exit(1)
        })
    }

    public close = async () => {
      await connection.close().catch(err => {
          console.error(err)
          process.exit(1)
      })
  }

    
}

export const mongodb = new MongoDB(process.env.MONGODB_URL)