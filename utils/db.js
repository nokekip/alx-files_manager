import mongodb from 'mongodb';
import Collection from 'mongodb/lib/collection';
import evn_loader from './evn_loader';

/**
 * MongoDB client
 */
class DBClient {
  /**
     * Creates a new DBClient instance
    */
  constructor() {
    evn_loader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbUrl, { userUnifiedTopology: true });
    this.client.connect();
  }

  /**
     * Get the connection to the database
     * @returns {Promise} connection
    */
  async isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
