const pool = require('../config/database')

async function runMigration() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id        SERIAL PRIMARY KEY,
        url       TEXT NOT NULL,
        title     TEXT,
        price     NUMERIC(10, 2),
        last_price NUMERIC(10, 2),
        email     TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `)

    console.log('✅ Tabela products criada/verificada com sucesso')
  } catch (err) {
    console.error('❌ Erro ao rodar migration:', err.message)
  } finally {
    await pool.end()
  }
}

runMigration()