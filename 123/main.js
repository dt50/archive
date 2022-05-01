const url = window.location.href
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input')
const resultBox = document.getElementById('results-box')
const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value

const sendSearchData = (game) => {
    $.ajax({
        type: 'POST',
        url: '/files/search/',
        data: {
            'csrfmiddlewaretoken' : csrf,
            'game': game,
        },
        success: (res) => {
            console.log(res.data)
            const data = res.data
            if (Array.isArray(data)){
                resultBox.innerHTML = ""
                data.forEach(files => {
                    resultBox.innerHTML += `
                        <a href="${files.download}" class="item">
                            <div class="row mt-2 mb-2">
                                <div class="col-10">
                                    <h6>${files.name}</h6>
                                </div>
                                <div class="col-10">
                                    <p class="text-muted">${files.attributes.join(', ')}</p>
                                </div>
                            </div>
                        </a>
                    `
                })
            } else {
                if (searchInput.value.length > 0 ) {
                    resultBox.innerHTML = `<b>${data}</b>`
                } else {
                    resultBox.classList.add('not-visible')
                }
            }
        },
        error: (err) => {
            console.log(err)
        }
    })
}

searchInput.addEventListener('keyup', e=>{
    console.log(e.target.value)
    if (resultBox.classList.contains('not-visible')){
        resultBox.classList.remove('not-visible');
    }

    sendSearchData(e.target.value)
})

