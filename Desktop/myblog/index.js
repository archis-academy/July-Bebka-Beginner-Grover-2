document.getElementById("hizmetlerLink").addEventListener("click", function() {
    // Yeni bir pencere aç ve onu newWindow değişkenine ata
    var newWindow = window.open("", "", "width=400,height=400");

    // Yeni pencereye HTML içeriği yaz
    newWindow.document.write(`
        <html>
        <head>
            <title>Hizmetlerimiz Çok Yakında</title>
            <link rel="stylesheet" href="style.css"> <!-- Harici CSS dosyasını dahil et -->
        </head>
        <body>
            <h1 class="service-message">Hizmetlerimiz Çok Yakında</h1>
        </body>
        </html>
    `);

    // Yeni pencereyi kapat ve içeriği sonlandır
    newWindow.document.close(); // Pencerenin yazma işlemini bitir
});