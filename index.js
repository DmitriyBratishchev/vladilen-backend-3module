
const http = require('http')
const express = require('express')
const chalk = require('chalk');
const fs = require('fs/promises')
const path =require('path')
const { addNote, removeNote, getNotes, editNote } = require('./notes.controller');
// const yargs = require("yargs");
// const pkg = require('./package.json')

const port = 3030
// const basePath = path.join(__dirname, 'pages')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages') // переопределяем название папки со страницей fronend (default = 'views')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))

app.get('/', async (req, res) => {
  res.render('index', {
    title: "Express app.",
    notes: await getNotes()
  })
})

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: "Express app.",
    notes: await getNotes()
  })
})

app.delete('/:id', async (req, res) => {
  const id = req.params.id
  console.log("delete id", id);
  await removeNote(id)
  res.render('index', {
    title: "Express app.",
    notes: await getNotes()
  })
})

app.put("/:id", async (req, res) => {
  const id = req.params.id
  const text = req.body
  await editNote(id, text)
  res.render('index', {
    title: "Express app.",
    notes: await getNotes()
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port} ... `));
})

// Страшный сон

// const server = http.createServer(async (req, res) => {
//   console.log('server!');
//   if (req.method === 'GET') {
//     const content = await fs.readFile(path.join(basePath, 'index.html'))
//     res.setHeader('content-type', 'text/html')
//     res.writeHead(200, {
//       'Content-Type': 'text/html'
//     })
//     res.end(content)
//   } else if (req.method === 'POST') {
//     const body = []

//     req.on('data', (data) => {
//       body.push(Buffer.from(data))
//     })

//     req.on('end', () => {
//       const title = body.toString().split('=')[1].replaceAll('+', ' ')
//       addNote(title)
//       res.end(`Title = ${title}`)
//     })

//   }

// })

// console.log(pkg.version);

// yargs.command({
//   command: 'add',
//   description: 'Add new note to list',
//   builder: {
//     title: {
//       type: 'string',
//       describe: 'Note title',
//       demandOption: true
//     }
//   },
//   handler({title}) {
//     addNote(title)
//   }
// })

// yargs.command({
//   command: 'list',
//   description: 'Print all notes',
//   async handler() {
//     printNotes()
//   }
// })

// yargs.command({
//   command: 'remove',
//   description: 'Remove note by id',
//   builder: {
//     id: {
//       type: 'string',
//       describe: 'Note id',
//       demandOption: true
//     }
//   },
//   handler({id}) {
//     removeNote(id)
//   }
// })

// yargs.parse()
