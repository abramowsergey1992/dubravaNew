<div
	class="modal modalbox modalbox_trans"
	data-modal-target="search"
	data-modal-triger="search">
	<div class="search-window">
		<form
			id="searchForm"
			class="search-window-form"
			action="search_result.html">
			<input
				id="searchField"
				class="search__field"
				type="text"
				placeholder="Начните поиск" />
			<button class="search__btn" type="submit">
				<svg>
					<use xlink:href="theme/img/sprite.svg#arrow_search"></use>
				</svg>
			</button>
		</form>
		<ul class="search-suggest"></ul>
		<div class="search-empty">
			По вашему запросу ничего не найдено. Попробуйте другой запрос
		</div>
		<template id="suggestItem">
			<li class="search-suggest__item">
				<a href="#"></a>
			</li>
		</template>
	</div>
</div>
<script src="theme/js/lodash.min.js"></script>
<script>
	const API_SEARCH_URL = "r.json"; // or 'https://domain.ru/api/search'
	const searchWindow = document.querySelector(".search-window");
	const searchEmpty = searchWindow.querySelector(".search-empty");
	const templateSuggestItem = searchWindow.querySelector("#suggestItem");
	const searchField = searchWindow.querySelector("#searchField");
	const searchSuggest = searchWindow.querySelector(".search-suggest");
	const searchInputHandler = _.debounce(({ currentTarget }) => {
		const searchString = searchField.value;
		if (searchString.length > 1) {
			searchSuggest.innerHTML = "";
			const searchParam = new URLSearchParams({ searchString });
			fetch(`${API_SEARCH_URL}?${searchParam}`, {
				method: "GET",
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("resp", data, data.products);
					data.products.forEach((product) => {
						console.log(product);
						const suggestItem =
							templateSuggestItem.content.cloneNode(true);
						const link = suggestItem.querySelector("a");
						link.href = "/products/" + product.slug;
						link.innerHTML = product.title;
						searchSuggest.append(suggestItem);
					});
					searchEmpty.style.display = "none";
				})
				.catch((err) => {
					searchSuggest.innerHTML = "";
					searchEmpty.style.display = "block";
				});
		} else {
			searchSuggest.innerHTML = "";
			searchEmpty.style.display = "block";
		}
	}, 250);
	searchField.addEventListener("input", searchInputHandler);
</script>
