function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(angka);
}

function hitungPajak() {
    const pkpInput = document.getElementById('pkpInput');
    const pkp = parseFloat(pkpInput.value) || 0;
    const resultBody = document.getElementById('resultBody');
    const totalPkpLabel = document.getElementById('totalPkpLabel');
    const totalPajakLabel = document.getElementById('totalPajak');
    
    // Lapisan tarif sesuai UU HPP (Pasal 17)
    const lapisan = [
        { tarif: 0.05, batas: 60000000 },
        { tarif: 0.15, batas: 190000000 }, 
        { tarif: 0.25, batas: 250000000 }, 
        { tarif: 0.30, batas: 4500000000 }, 
        { tarif: 0.35, batas: Infinity }
    ];

    let sisaPkp = pkp;
    let totalPajak = 0;
    let html = '';

    for (let i = 0; i < lapisan.length; i++) {
        if (sisaPkp <= 0) break;

        let pengali = Math.min(sisaPkp, lapisan[i].batas);
        let pajakLapisan = pengali * lapisan[i].tarif;
        
        totalPajak += pajakLapisan;

        html += `
            <tr>
                <td class="text-center">${(lapisan[i].tarif * 100).toFixed(0)}%</td>
                <td class="text-center">X</td>
                <td class="text-right">${formatRupiah(pengali)}</td>
                <td class="text-center">=</td>
                <td class="text-right">${formatRupiah(pajakLapisan)}</td>
            </tr>
        `;

        sisaPkp -= pengali;
    }

    resultBody.innerHTML = html;
    totalPkpLabel.innerText = "Total PKP: " + formatRupiah(pkp);
    totalPajakLabel.innerText = formatRupiah(totalPajak);
}