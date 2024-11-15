let html5QrCode;

document.getElementById('start-button').addEventListener('click', function () {
    console.log("Botão 'Iniciar Leitura' clicado");

    // Mostra o botão de "Voltar" e esconde o botão "Iniciar Leitura"
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('back-button').style.display = 'inline-block';

    // Inicializa o leitor de QR Code
    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // Inicia a câmera e o scanner de QR Code
    html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeMessage => {
            alert(`Código QR lido: ${qrCodeMessage}`);
            html5QrCode.stop(); // Para a câmera após a leitura
            resetInterface(); // Volta à interface inicial
        },
        errorMessage => {
            console.warn(`Erro de leitura: ${errorMessage}`);
        }
    ).catch(err => {
        console.error("Erro ao acessar a câmera: ", err);
        resetInterface(); // Volta à interface inicial em caso de erro
    });
});

document.getElementById('back-button').addEventListener('click', function () {
    console.log("Botão 'Voltar' clicado");
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            resetInterface(); // Volta à interface inicial
        }).catch(err => {
            console.error("Erro ao parar a câmera: ", err);
            resetInterface(); // Volta à interface inicial mesmo em caso de erro
        });
    } else {
        resetInterface(); // Volta à interface inicial caso a câmera não esteja ativa
    }
});

function resetInterface() {
    // Esconde o leitor e volta ao estado inicial
    document.getElementById('start-button').style.display = 'inline-block';
    document.getElementById('back-button').style.display = 'none';
    html5QrCode.clear();
}
