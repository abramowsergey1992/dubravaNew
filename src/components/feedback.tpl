<div class="modal modalbox" data-modal-target="feedback" data-modal-triger="feedback">
  <div class="window">
    <button class="close" type="button" data-modal-triger="feedback"></button>
    <div class="h2">Оставьте заявку</div>
    <div class="text">Менеджер свяжется с вами и ответит на все интересующие вопросы.</div>
    <form action="feedback.html" validate>
      <div class="items">
        <div class="item">
          <div class="fieldset">
            <div class="field">
              <label for="">Ваше имя *</label>
              <input type="text" placeholder="Иванов Иван Иванович" data-validate="text">
            </div>
            <div class="field">
              <label for="">Ваш email *</label>
              <input type="text" placeholder="example@email.com" data-validate="email">
            </div>
            <div class="field">
              <label for="">Номер телефона *</label>
              <input type="text" placeholder="+7 (ххх) ххх-хх-хх" data-validate="text" data-mask="phone">
            </div>
          </div>
        </div>
        <div class="item">
          <div class="fieldset">
            <div class="field">
              <label for="">Ваш комментарий/вопрос *</label>
              <textarea name="" id="" placeholder="Поле ввода" data-validate="text"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="field accept">
        <input type="checkbox" id="feedback" name="gender" checked="">
        <label for="feedback">Нажимая кнопку «Отправить», я даю согласие на обработку моих персональных данных</label>
      </div>
      <button class="btn greenfill h50 p32 fs16 fw600" type="submit">Отправить</button>
    </form>
  </div>
</div>
