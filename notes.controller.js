
const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
// console.log(notesPath);

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.green('Note was added!'));
}

async function getNotes() {
  const notesString = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notesString)) ? JSON.parse(notesString) : []
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.red.bgGreen('Here is the list of notes'), ':')
  notes.forEach(note => {
    console.log(chalk.white.bgHex('#0000ff')(note.id), chalk.blueBright(note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes()
  const indexNote = notes.findIndex(n => n.id === id)
  if (indexNote === -1) {
    console.log(chalk.red(`Элемент с id=${id} не найден`));
    return
  };
  const newNotes = notes.splice(indexNote, 1)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log('Запись', chalk.green(newNotes[0].title), 'успешно удалена.');
}

async function editNote(id, body) {
  const notes = await getNotes()
  const indexNote = notes.findIndex(n => n.id === id)
  if (indexNote === -1) {
    // await addNote(body.title)
    return
  };
  notes[indexNote] = { ...notes[indexNote], title: body.title }
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log('Запись успешно изменена.');

}

module.exports = {
  addNote,
  getNotes,
  editNote,
  removeNote
}