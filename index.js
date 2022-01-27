const yargs = require("yargs");
const pkg = require('./package.json')
const { addNote, printNotes, removeNote } = require('./notes.controller')

console.log(pkg.version);

yargs.command({
  command: 'add',
  description: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  handler({title}) {
    addNote(title)
  }
})

yargs.command({
  command: 'list',
  description: 'Print all notes',
  async handler() {
    printNotes()
  }
})

yargs.command({
  command: 'remove',
  description: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true
    }
  },
  handler({id}) {
    removeNote(id)
  }
})

yargs.parse()
