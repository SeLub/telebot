// posts.service.js
const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;

//const notFoundError = (id) => { throw new MoleculerError(`Record with ${id} not found.`, 404, "ERR_NOTFOUND"); }

// PostgreSQL connection configuration
const pgConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

// Create a PostgreSQL client
const client = new Client(pgConfig);

// Connect to the PostgreSQL database
client.connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch(err => console.error("Error connecting to PostgreSQL:", err));

module.exports = {
    name: "posts",
    settings: {
    },
    async started() {
        try {
            // Check if the tables exist, create them if not
            await this.createTables();
        } catch (err) {
            console.error("Error creating tables:", err);
        }
    },
    methods: {
        async createTables() {
            // Check if the "post" table exists
            let res = await client.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'post'
                );
            `);

            // If the "post" table doesn't exist, create it
            if (!res.rows[0].exists) {
                await client.query(`
                    CREATE TABLE post (
                        post_id UUID PRIMARY KEY,
                        post_text TEXT
                    );
                `);
                console.log("Created 'post' table");
            }

            // Check if the "photo" table exists
            res = await client.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'photo'
                );
            `);

            // If the "photo" table doesn't exist, create it
            if (!res.rows[0].exists) {
                await client.query(`
                    CREATE TABLE photo (
                        photo_id UUID PRIMARY KEY,
                        post_id_photo UUID,
                        photo_filename TEXT,
                        FOREIGN KEY (post_id_photo) REFERENCES post(post_id)
                    );
                `);
                console.log("Created 'photo' table");
            }
        },
        async checkPostExists(postId) {
            const res = await client.query(`
                SELECT COUNT(*) FROM post WHERE post_id = $1;
            `, [postId]);
            const postExists = !!Number(res.rows[0].count);
            if (!postExists) return Promise.reject(new MoleculerError("Post not found!", 404));
        },
        async getPost(postId) {
            // Check if the post exists
            await this.checkPostExists(postId);
            const res = await client.query(`
            SELECT * FROM post WHERE post_id = $1;
        `, [postId]);
        return res.rows;

        }, 
        async getPhotos(photoId) {
            const res = await client.query(`
            SELECT * FROM photo WHERE post_id_photo = $1;
        `, [photoId]);
        return res.rows;

        },          
        authorize(ctx, route, req, res) {
            // Read the token from header
            let auth = req.headers["authorization"];
            if (auth && auth.startsWith("Bearer")) {
                let token = auth.slice(7);

                // Check the token
                if (token == "123456") {
                    // Set the authorized user entity to `ctx.meta`
                    ctx.meta.user = { id: 1, name: "John Doe" };
                    return Promise.resolve(ctx);

                } else {
                    // Invalid token
                    return Promise.reject(new E.UnAuthorizedError(E.ERR_INVALID_TOKEN));
                }

            } else {
                // No token
                return Promise.reject(new E.UnAuthorizedError(E.ERR_NO_TOKEN));
            }
        }

    },
    actions: {
        listPosts: {
            rest: "GET /",
            // SELECT * FROM post LEFT JOIN photo ON post.post_id=photo.post_id_photo
            async handler(ctx) {
                const res = await client.query(`
                    SELECT * FROM post
                `);
                return res.rows;
            }
        },
        listPhotos: {
            rest: "GET /photos",
            async handler(ctx) {
                const res = await client.query(`
                    SELECT * FROM photo;
                `);
                return res.rows;
            }
        },
        getPosts: {
            rest: "GET /:post_id",
            params: {
                post_id: { type: "uuid" }
            },
            async handler(ctx) {
                const { post_id } = ctx.params;
                return await this.getPost(post_id);
            }
        },
        getPhotos: {
            rest: "GET /photos/:post_id",
            params: {
                post_id: { type: "uuid" }
            },
            async handler(ctx) {
                const { post_id } = ctx.params;
                return await this.getPhotos(post_id);
            }
        },
        createPost: {
            rest: "POST /",
            params: {
                  post_text: { type: "string" },
                  photo_filename: { type: "string", optional: true }
              },
            async handler(ctx) {
                const { post_text, photo_filename } = ctx.params;
                const post_id = uuidv4();
         
                // If photo_filename is provided, create a new photo record
                if (photo_filename !== "") {
                    // Create a new post record
                    await client.query(`
                        INSERT INTO post (post_id, post_text) 
                        VALUES ($1, $2);
                    `, [post_id, post_text]);

                    const post_id_photo = post_id;
                    const photo_id = uuidv4()
                    await client.query(`
                        INSERT INTO photo (photo_id, post_id_photo, photo_filename) 
                        VALUES ($1, $2, $3);
                    `, [photo_id, post_id_photo, photo_filename]);
                } else {
                        // Create a new post record
                        await client.query(`
                            INSERT INTO post (post_id, post_text) 
                            VALUES ($1, $2);
                            `, [post_id, post_text]);
                }
                return await this.getPost(post_id);
            }
        },
        addPhotoToPost: {
            rest: "POST /photos/:post_id",
            params: {
                  post_id: { type: "string" },
                  photo_id: { type: "string" },
                  photo_filename: { type: "string", optional: true }
              },
            async handler(ctx) {
                const { post_id, photo_id, photo_filename } = ctx.params;
                await this.checkPostExists(post_id);
                await client.query(`
                    INSERT INTO photo (photo_id, post_id_photo, photo_filename) 
                    VALUES ($1, $2, $3);
                    `, [photo_id, post_id, photo_filename]);
                return await this.getPost(post_id);
            }
        },
        deletePhotoFromPost: {
            rest: "DELETE /photos/:post_id",
            params: {
                post_id: { type: "string" },
                photo_filename: { type: "string", optional: true }
            },
            async handler(ctx) {
                const { post_id, photo_filename } = ctx.params;
                await this.checkPostExists(post_id);
                try {
                    await ctx.call("storage.deleteFile", { filename: photo_filename });

                    await client.query(`
                    DELETE FROM photo WHERE post_id_photo='${post_id}' AND photo_filename='${photo_filename}'`);
                    return 'Deleted From DB and Storage';
                } catch(e) {
                    return e;
                }
                
            }
        },
        put: {
            rest: "PUT /:id",
            params: {
                id: { type: "uuid" },
                post_text: { type: "string" }
            },
            async handler(ctx) {
                const { id, post_text } = ctx.params;
                // Check if the post exists
                await this.checkPostExists(id);
                await client.query(`
                    UPDATE post SET post_text = $1 
                    WHERE post_id = $2;`, [post_text, id]);
                return await this.getPost(id);
            }
        },
        delete: {
            rest: "DELETE /:id",
            params: {
                id: { type: "uuid" }
            },
            async handler(ctx) {
                const { id } = ctx.params;
                // Check if the post exists
                await this.checkPostExists(id);
                // Delete photos of post record
                await client.query(`
                DELETE FROM photo WHERE post_id_photo = $1;
                `, [id]);
                // Delete the post record
                await client.query(`
                    DELETE FROM post WHERE post_id = $1;
                    `, [id]);

                return { deletedPostId: id };
            }
        },
        publishPost: {
            rest: 'POST /publish/:id',
            params: {
                id: { type: "uuid" },
            },
            async handler(ctx) {
                const { id } = ctx.params;
                try {
                    const result1 = await this.getPost(id);
                    const { post_text: text } = result1[0];
                    const result = await this.getPhotos(id);
                    const mediaArray = result.map(element => element.photo_filename);
                    await ctx.call("telegram.sendPost", { text , mediaArray });
                    return mediaArray;
                } catch(error) {
                    console.log('Error', error);
                }
                
                
            }

        }
    }
};
