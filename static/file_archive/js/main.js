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

$('.search-date').on('change', function() {
	var today = new Date($('.search-date').val());
	$('#search-input').val(('0' + (today.getDate())).slice(-2) + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + (1900 + today.getYear()));
});

$('.clear-search').on('click', function() {
	$('#search-input').val('');
});

$('.chart-show').on('click', function() {
	$('.chart').toggleClass('d-none');
});