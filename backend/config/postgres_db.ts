import { Pool } from 'pg';

// Инициализация пула соединений
const pool = new Pool();

export default {
    connect_to_postgres_db: async (poolConfig: object) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT 1');
            client.release();

            if (result.rows[0] && result.rows[0]['?column?'] === 1) {
                console.log('Успешное подключение к БД: PostgreSQL. Пул соединений успешно создан.');
            } else {
                console.log('Возникла ошибка при создании пула');
            } 

            return pool;
        } catch (error) {
            console.error('Возникла ошибка при подключении к БД: PostgreSQL');
            console.error(error);
            return null;
        }
    },

    identify_user: async (pool: Pool, userData: { schema: string, login: string, password: string }) => {
        try {
            const queryText = `SELECT id FROM ${userData.schema} WHERE login=$1 AND password=$2`;
            const values = [userData.login, userData.password];
            const res = await pool.query(queryText, values);
    
            // Check if res is not null and res.rowCount is greater than 0
            if (res && res.rowCount && res.rowCount > 0) {
                return true;  // User found
            } else {
                return false; // User not found
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return false; // Error occurred during query
        }
    },
    add_user: async (pool: Pool, userData: { schema: string, login: string, email: string, password: string, role: string }) => {
        try {
            const queryText = `INSERT INTO ${userData.schema} (login, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [userData.login, userData.email, userData.password, userData.role];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_insert_user'
                };
            }
        } catch (error: any) {
            if (error.code === '23505') { 
                return {
                    code: error.code,
                    duplicate_field: error.detail.includes('login') ? 'login' : error.detail.includes('email') ? 'email' : 'undefined'
                };
            } else {
                console.error('Возникла ошибка при работе с БД: PostgreSQL');
                console.error(error);
                return {result: 'error'};
            }
        }
    },

    add_book: async (pool: Pool, bookData: { schema: string, title: string, publication: string, year: number, author_name: string, description: string, user_id: number }) => { 
        try {
            const queryText = `INSERT INTO ${bookData.schema} (title, publication, year, author_name, description, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = [bookData.title, bookData.publication, bookData.year, bookData.author_name, bookData.description, bookData.user_id];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_insert_book'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    delete_book: async (pool: Pool, bookData: { schema: string, id: number }) => {
        try {
            const queryText = `DELETE FROM ${bookData.schema} WHERE id = $1 RETURNING *`;
            const values = [bookData.id];
            const res = await pool.query(queryText, values);
    
            // Check if res is not null and res.rowCount is greater than 0
            if (res && res.rowCount && res.rowCount > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_delete_book'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    update_book: async (pool: Pool, bookData: { schema: string, id:number, title: string, publication: string, year: number, author_name: string, description: string }) => {
        try {
            const queryText = `UPDATE ${bookData.schema} SET title = $1, publication = $2, year = $3, author_name = $4, description = $5 WHERE id = $6 RETURNING *`;
            const values = [bookData.title, bookData.publication, bookData.year, bookData.author_name, bookData.description, bookData.id];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_update_book'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    changeRole: async (pool: Pool, userData: { schema: string, id: number, role: string }) => {
        try {
            const queryText = `UPDATE ${userData.schema} SET role = $1 WHERE id = $2 RETURNING *`;
            const values = [userData.role, userData.id];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_update_role'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    getAllBooks: async (pool: Pool, bookData: { schema: string }) => {
        try {
            const queryText = `SELECT * FROM ${bookData.schema}`;
            const res = await pool.query(queryText);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_get_all_books'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    getBookByID: async (pool: Pool, bookData: { schema: string, id: number }) => {
        try {
            const queryText = `SELECT * FROM ${bookData.schema} WHERE id = $1`;
            const values = [bookData.id];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_get_book_by_id'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    }
}
