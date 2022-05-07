const url = window.location.href
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input')
const resultBox = document.getElementById('results-box')
const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value
const searchDate = document.getElementsByClassName('search-date')

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
                            <div class="py-5">
                                <div class="py-2">
                                    <h6>${files.name}</h6>
                                </div>
                                <div class="py-3">
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
                    resultBox.innerHTML = ''
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