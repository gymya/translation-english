console.log('Content script loaded');
document.addEventListener('mouseup', (event)=>{
    let selectedText = window.getSelection().toString().trim();
    if (selectedText !== '' && selectedText.length < 150) {
      const apiKey = 'AIzaSyCNhHY9JAY_xhNM55xW8xxVmxbMgHoJYLM'
      // console.log('Selected Text:', selectedText);
      fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: selectedText,
          target: 'zh-tw',
          source: 'en'
        })
      })
      .then((res) => res.json())
            .then((response) => {
              console.log("Success:", response)
              let newDiv = document.createElement('div')
              newDiv.id = 'textBox'

              let pElement = document.createElement('p')
              pElement.innerText = response.data.translations[0].translatedText
              newDiv.appendChild(pElement)
              document.body.appendChild(newDiv);

              newDiv.style.position = 'absolute'
              newDiv.style.top = (event.pageY + 16) + 'px'
              newDiv.style.left = (event.pageX + 16) + 'px'
              newDiv.style.backgroundColor = '#fff'
              newDiv.style.color = '#030303'
              newDiv.style.border = '0px solid black'
              newDiv.style.padding = '0'
              newDiv.style.fontFamily = 'Arial'
              newDiv.style.fontSize = '12px'
              newDiv.style.zIndex = '9999'
              newDiv.style.borderRadius = '5px'
              newDiv.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)'
              newDiv.style.lineHeight = '1.5'
              newDiv.style.overflow = 'hidden'
              newDiv.style.textOverflow = 'ellipsis'
              newDiv.style.whiteSpace = 'nowrap'

              pElement.style.margin = '0.25em 0.5em'

              setTimeout(() => {
                newDiv.remove()
              }, 2000)
            });
    }
});
