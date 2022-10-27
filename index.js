
function adatMegjelenites(termekLista){
    document.getElementById('megjelenitRow').textContent = ''
    termekLista.forEach(product => {

        let megjelenitCol = document.createElement('div')
        megjelenitCol.classList.add('col')
        let megjelenitCard = document.createElement('div')
        megjelenitCard.classList.add('card')
        let megjelenitCardBody = document.createElement('div')
        megjelenitCardBody.classList.add('card-body')
        let megjelenitCardTitle = document.createElement('div')
        megjelenitCardTitle.classList.add('card-title')
        let megjelenitCardSubTitle = document.createElement('div')
        megjelenitCardSubTitle.classList.add('card-subtitle')
        let megjelenitCardText = document.createElement('div')
        megjelenitCardText.classList.add('card-text')
        let megjelenitCardTextUL = document.createElement('ul')
        megjelenitCardTextUL.classList.add('megjelenitCardTextUL')
        let megjelenitCardImage = document.createElement('img')
        megjelenitCardImage.classList.add('card-img-top')

        let i = 0;
        for (let key in product){
            switch (i){
                case 1:
                    megjelenitCardTitle.textContent = product[key]
                    break;
                case 2:
                    megjelenitCardSubTitle.textContent = product[key]
                    break;
                case 9:
                    megjelenitCardImage.src = product[key]
                    break;
                default:
                    let li = document.createElement('li')
                    li.textContent = key + ': ' + product[key]
                    megjelenitCardTextUL.appendChild(li)
                    break;
            }
            i++
        }
        megjelenitCardText.appendChild(megjelenitCardTextUL)
        megjelenitCardBody.appendChild(megjelenitCardImage)
        megjelenitCardBody.appendChild(megjelenitCardTitle)
        megjelenitCardBody.appendChild(megjelenitCardSubTitle)
        megjelenitCardBody.appendChild(megjelenitCardText)
        megjelenitCard.appendChild(megjelenitCardBody)
        megjelenitCol.appendChild(megjelenitCard)
        document.getElementById('megjelenitRow').appendChild(megjelenitCol)
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
        adatMegjelenites(productsCopy.sort((a, b) => 
        (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)))
        console.log(productsCopy);
    })
})

document.getElementById('btnCsokkeno').addEventListener('click', () => {
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