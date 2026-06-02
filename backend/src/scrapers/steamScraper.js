const axios = require('axios')
const cheerio = require('cheerio')

async function scrapeSteamGame(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        // Simula um navegador real para a Steam não bloquear
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        // Aceita cookies de idade — necessário para jogos com restrição etária
        'Cookie': 'birthtime=0; mature_content=1',
      },
      // Segue redirecionamentos automaticamente
      maxRedirects: 5,
      timeout: 10000,
    })

    const $ = cheerio.load(data)

    // Nome do jogo
    const title = $('#appHubAppName').text().trim()

    // Preço — tenta pegar o preço com desconto primeiro, depois o normal
    let priceText =
      $('.discount_final_price').first().text().trim() ||
      $('.game_purchase_price').first().text().trim()

    // Remove "R$", espaços e troca vírgula por ponto
    const price = parseFloat(
      priceText
        .replace('R$', '')
        .replace(/\s/g, '')
        .replace(',', '.')
    )

    if (!title) {
      throw new Error('Não foi possível encontrar o nome do jogo. Verifique a URL.')
    }

    // Verifica se é jogo gratuito
    const isFree = 
      $('.game_purchase_price').text().toLowerCase().includes('free') ||
      $('.game_purchase_price').text().toLowerCase().includes('grátis') ||
      $('.game_area_purchase_game').text().toLowerCase().includes('free to play')

    if (isNaN(price)) {
      if (isFree) {
        return { title, price: 0.00, free: true }
      }
      throw new Error('Não foi possível encontrar o preço. O jogo pode ser gratuito ou a URL está incorreta.')
    }

    return { title, price, free: false }

  } catch (err) {
    // Relança o erro com contexto
    throw new Error(`Erro ao raspar ${url}: ${err.message}`)
  }
}

module.exports = { scrapeSteamGame }