const Main = {
  init: function() {
    this.cashSelectors();
    this.bindEvents();
  },
  
  cashSelectors: function() {
    this.$checkButtons = document.querySelectorAll('.check');
    this.$inputTask = document.querySelector('#inputTask');
    this.$list = document.querySelector('#list');
    this.$removeButtons = document.querySelectorAll('.remove');
  },
  
  bindEvents: function() {
    //Corresponde ao 'this' no escopo em que se refere ao Main
    const self = this;
    
    this.$checkButtons.forEach( (button) => {
      button.onclick = self.Events.checkButton_click;
    });
    
    this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this);
    
    this.$removeButtons.forEach( (button) => {
      button.onclick = self.Events.removeButton_click;
    });
  },
  
  
  Events: {
    //Botão de check
    checkButton_click: (e) => {
      const li = e.target.parentElement;
      const isDone = li.classList.contains('done')
      
      if(!isDone){
        return li.classList.add('done');
      }
      li.classList.remove('done');
    },
    
    //Adição de tarefa
    inputTask_keypress: function(e){
      const key = e.key;
      const value = e.target.value;
      
      if(key === 'Enter'){
        this.$list.innerHTML += `
          <li>
            <div class="check"></div>
            <label class="task">
              ${value}
            </label>
            <button class="remove"></button>
          </li>
        `;
        
        e.target.value = '';
        
        this.cashSelectors();
        this.bindEvents();
      }
    },
    
    //Botão de exclusão
    removeButton_click: (e) => {
      const li = e.target.parentElement;
      
      li.classList.add('removed');
      
      setTimeout ( () => {
        li.classList.add('hidden');
      }, 300);
    }
  }
}

Main.init();
