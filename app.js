const chalk = require("chalk");
const yargs = require("yargs");
const notesFun = require("./notesFun");


yargs.command({
    command: "Add",
    descripe: "Adding new note!",
    builder: {

        title: {
            descripe: "Note Title",
            type: "string",
            demandOption: true
        },
        body: {
            descripe: "Body of the Note!",
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        console.log("Body is " + argv.body);
        notesFun.addNote(argv.title, argv.body);

    }
})

yargs.command({
    "command": "Remove",
    descripe: "Removing a note!",
    builder: {
        title: {
            descripe: "Removes note from notes",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notesFun.removeNote(argv.title);
    }
})

yargs.command({
    command: "Read",
    descripe: "Read a note!",
    builder: {
        title: {
            descripe: "Title of the note ",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notesFun.ReadNote(argv.title)
    }
})
yargs.command({
    command: "List",
    descripe: "List a new note!",
    handler() {
        notesFun.ListNotes();
    }

})

yargs.parse();