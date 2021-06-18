const handleAccordeons = () => {
  const initAccordeons = () => {
    [...document.querySelectorAll('.accordeon')].forEach(accordeon => {
      let content = accordeon.querySelector('.accordeon__content');
      content.style.maxHeight = content.scrollHeight + 'px';
    });
  }
  
  [...document.querySelectorAll('.accordeon')].forEach(accordeon => {
    accordeon.querySelector('.accordeon__header').addEventListener('click', () => {
      accordeon.classList.toggle('is--active');
    })
  })
  
  initAccordeons();
  window.addEventListener('resize', initAccordeons);
}

window.addEventListener('load', () => {
  handleAccordeons();
})
