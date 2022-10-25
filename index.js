
function adatMegjelenites(termekLista){
    document.getElementById('eredmenyLista').textContent = ''
    termekLista.forEach(product => {

        let listItem = document.createElement('li')

        let i = 0;
        for (let key in product){
            if (i != 0 && i <= 8){
                listItem.innerHTML += key + ': ' + product[key] + '<br/>'
            }
            i++
        }
        listItem.innerHTML += '<br/>'

        document.getElementById('eredmenyLista').appendChild(listItem);
    })
}

document.getElementById('btnMind').addEventListener('click', () => {
        fetch('/products.json')
        .then(res => {
            return res.json()
        })
        .then(data => {
            adatMegjelenites(data.products)
        })
})

document.getElementById('btnAbc').addEventListener('click', () => {
    fetch('/products.json')
    .then(res => {
        return res.json()
    })
    .then(data => {
        productsCopy = [...data.products]
        adatMegjelenites(productsCopy.sort((a, b) => {return String(a.title) - String(b.title)}))
    })
})

document.getElementById('btnNovekvo').addEventListener('click', () => {
    fetch('/products.json')
    .then(res => {
        return res.json()
    })
    .then(data => {
        productsCopy = [...data.products]
        adatMegjelenites(productsCopy.sort((a, b) => b.price - a.price))
    })
})

document.getElementById('btnLeiras').addEventListener('click', () => {
    fetch('/products.json')
    .then(res => {
        return res.json()
    })
    .then(data => {
        productsCopy = [...data.products]
        adatMegjelenites(productsCopy.filter
            (x => x.description.toLowerCase().includes(
                document.getElementById('textLeiras').value.toLowerCase())))
    })
})

document.getElementById('btnAjanlat').addEventListener('click', () => {
    fetch('/products.json')
    .then(res => {
        return res.json()
    })
    .then(data => {
        productsCopy = [...data.products]
        adatMegjelenites(productsCopy.filter
            (x => x.price < 100).sort((a,b) => b.rating - a.rating))
    })
})