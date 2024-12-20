async function fetchCryptoPrices() {
  try {
    // CoinGecko API'yi çağır
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    const data = await response.json();

    // Fiyatları güncelle
    document.getElementById('btcPrice').textContent = data.bitcoin.usd.toLocaleString();
    document.getElementById('ethPrice').textContent = data.ethereum.usd.toLocaleString();


  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    document.querySelectorAll('span[id$="Price"]').forEach(span => {
      span.textContent = 'Soon...';
    });
  }
}

// Fiyatları düzenli olarak güncelle (her 30 saniyede bir)
setInterval(fetchCryptoPrices, 60000);

// Sayfa yüklendiğinde ilk kez fiyatları al
fetchCryptoPrices();
