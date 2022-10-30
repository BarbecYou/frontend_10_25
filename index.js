
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
                case 3:
                    {
                        let li = document.createElement('li')
                        li.textContent = 'Ár: ' + product[key] + '$'
                        li.style.fontWeight = 500;
                        megjelenitCardTextUL.appendChild(li)
                        break;
                    }
                case 4: {
                    let li = document.createElement('li')
                    li.textContent = 'Árcsökkenés mértéke: ' + product[key] + '%'
                    megjelenitCardTextUL.appendChild(li)
                    break;
                }
                case 5: {
                    let li = document.createElement('li')
                    li.textContent = 'Értékelés: ' + product[key] + '⭐'
                    megjelenitCardTextUL.appendChild(li)
                    break;
                }
                case 6: {
                    let li = document.createElement('li')
                    li.textContent = 'Raktáron: ' + product[key] + ' db'
                    megjelenitCardTextUL.appendChild(li)
                    break;
                }
                case 7: {
                    let li = document.createElement('li')
                    li.textContent = 'Márka: ' + product[key]
                    li.style.fontWeight = 500;
                    megjelenitCardTextUL.appendChild(li)
                    break;
                }
                case 8: {
                    let li = document.createElement('li')
                    li.textContent = 'Kategória: ' + product[key]
                    megjelenitCardTextUL.appendChild(li)
                    break;
                }
                case 9:
                    megjelenitCardImage.src = product[key]
                    break;
                default:
                    // data does not needed to be displayed
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

const categoriesSet = new Set()

document.addEventListener('DOMContentLoaded', generateCategories)

function generateCategories() {
    fetch('/products.json')
    .then(res => {
        return res.json()
    })
    .then(data => {
        data.products.forEach(product => {
            for (let key in product){
                if (key == 'category'){
                    categoriesSet.add(product[key])
                    console.log(categoriesSet)
                }
            }
        })
        categoriesSet.forEach(category => {
            let option = document.createElement('option')
            option.text = category
            option.value = category
            console.log(option)
            document.getElementById('category-filter').appendChild(option)
        })
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