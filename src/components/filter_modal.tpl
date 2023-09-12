
<div class="modal modalbox" data-modal-target="filter_modal" data-modal-triger="filter_modal">
  <div class="window block33">
    <button class="close" type="button" data-modal-triger="filter_modal"></button>
    <div class="h2">Фильтр</div>
    <div class="filter_modal">Произошла ошибка, повторите позже...</div>
  </div>
</div>
<script>
  const form_filter = document.querySelector('#form_filter');
  if(window.innerWidth<992){
  const wrapper = document.querySelector('.filter_modal');
  wrapper.innerHTML = '';
  wrapper.append(form_filter);}
</script>
