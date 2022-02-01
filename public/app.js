
console.log("Hello from app.js");

document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id

    remove(id).then(() => {
      e.target.closest('li').remove()
    })
  }
  if (e.target.dataset.type === 'edit') {
    const id = e.target.dataset.id
    const oldNote = e.target.closest('li').innerHTML.split('\n')
    const newTitle = prompt("Вы хотите изменить заголовок", oldNote[1].trim())
    if (newTitle) {
      edit(id, { title: newTitle }).then((res) => {
        oldNote[1] = newTitle
        e.path[1].innerHTML = oldNote.join('\n')
      })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, {method: "DELETE"})
}

async function edit(id, body) {
  const bodyJSON = JSON.stringify(body)
  await fetch(`/${id}`, {
    method: "PUT",
    body: bodyJSON,
    headers: {
      "Content-Type": 'application/json',

    }
  })
}