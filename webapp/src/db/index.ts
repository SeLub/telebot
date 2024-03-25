import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

if (import.meta.VITE_NODE_ENV !== 'production') {
    await import('rxdb/plugins/dev-mode').then((module) => addRxPlugin(module.RxDBDevModePlugin));
}

class Database {
    name: string;
    db: any;
    constructor(name: string) {
        this.name = name;
        this.db = async () => {
            const getUUID = () => {
                const url = URL.createObjectURL(new Blob());
                const UUID = url.substring(url.lastIndexOf('/') + 1);
                return UUID;
            };
            const uniqueDBName = this.name + '-' + getUUID();
            const db = await createRxDatabase({
                name: uniqueDBName,
                storage: getRxStorageDexie(),
            });
            await db.addCollections({
                posts: {
                    schema: PostsSchema,
                },
                attachments: {
                    schema: AttachmentsSchema,
                },
            });
            return db;
        };
    }
    PostsSchema = {
        version: 0,
        title: 'Posts schema',
        primaryKey: 'post_id',
        type: 'object',
        properties: {
            post_id: {
                type: 'string',
                maxLength: 36, // <- the primary key must have set maxLength; for UUID v4 = 36
            },
            post_text: {
                type: 'string',
            },
        },
        required: ['post_id'],
    };

    AttachmentsSchema = {
        version: 0,
        title: 'Attachments schema',
        primaryKey: 'attachment_id',
        type: 'object',
        properties: {
            attachment_id: {
                type: 'string',
                maxLength: 36,
            },
            attachment_id_post: {
                type: 'string',
            },
            attachment_filename: {
                type: 'string',
            },
        },
        required: ['attachment_id_post', 'attachment_filename'],
    };

    async listCollections() {
        const collectionNames = Object.keys((await this.db).collections);
        console.log('Collections:', collectionNames);
        return collectionNames;
    }
}

const PostsSchema = {
    version: 0,
    title: 'Posts schema',
    primaryKey: 'post_id',
    type: 'object',
    properties: {
        post_id: {
            type: 'string',
            maxLength: 36, // <- the primary key must have set maxLength; for UUID v4 = 36
        },
        post_text: {
            type: 'string',
        },
    },
    required: ['post_id'],
};
const AttachmentsSchema = {
    version: 0,
    title: 'Attachments schema',
    primaryKey: 'attachment_id',
    type: 'object',
    properties: {
        attachment_id: {
            type: 'string',
            maxLength: 36,
        },
        attachment_id_post: {
            type: 'string',
        },
        attachment_filename: {
            type: 'string',
        },
    },
    required: ['attachment_id_post', 'attachment_filename'],
};
const createDB = async (name: string) => {
    const getUUID = async () => {
        const url = URL.createObjectURL(new Blob());
        const UUID = url.substring(url.lastIndexOf('/') + 1);
        return UUID;
    };
    const uniqueDBName = name + '-' + (await getUUID());
    const db = await createRxDatabase({
        name: uniqueDBName,
        storage: getRxStorageDexie(),
    });
    await db.addCollections({
        posts: {
            schema: PostsSchema,
        },
        attachments: {
            schema: AttachmentsSchema,
        },
    });
    return db;
};
const list = async (db) => {
      console.log('!!! ', Object.keys(db.collections));
};
class Database{
      constructor(name: string){
            this.name = name
            this.posts = []
            this.attachments = []
            this.db = [this.posts, this.attachments]
      }
postInsert(text){
      this.posts.push(text)
      return this.posts.length - 1
}
postDelete(post_id){
      
}
postUpdate(post_id){}
postFindOne(post_id){}
postFindAll(){}
postSearch(query){}
attachmentInsert(){}
attachmentDelete(attachment_id){}
attachmentUpdate(attachment_id){}
attachmentFindOne(attachment_id){}
attachmentFindAll(){}
attachmentSearch(query){}
attachmentFindByPost(post_id){}
}



export default createDB;
