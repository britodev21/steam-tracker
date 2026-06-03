const pool = require('../config/database')

async function runMigration() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id          SERIAL PRIMARY KEY,
        url         TEXT NOT NULL,
        app_id      TEXT,
        title       TEXT,
        price       NUMERIC(10, 2),
        last_price  NUMERIC(10, 2),
        email       TEXT NOT NULL,
        created_at  TIMESTAMPTZ DEFAULT NOW(),
        updated_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `)

    // Adiciona app_id se a tabela já existia sem ela
    await pool.query(`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS app_id TEXT;
    `)

    console.log('✅ Migration executada com sucesso')
  } catch (err) {
    console.error('❌ Erro na migration:', err.message)
  } finally {
    await pool.end()
  }
}

runMigration()