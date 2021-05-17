const chalk = require("chalk");
const Filesystem = require("fs");


const readNote = (title) => {
    const notes = loadNotes();
    const index = notes.findIndex(x => x.title === title);
    if (index == -1) {
        console.log("Note was not found!");
    } else {
        const note = notes[index];
        console.log(chalk.green.inverse("Note Title is " + note.title + " The note body " + note.body));
    }
}
const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.green.inverse("Node title is " + note.title));
        console.log(chalk.green.inverse("Node body is " + note.body));
        console.log("========================================")

    });
}

const removeNote = (title) => {

    const notes = loadNotes();
    const index = notes.findIndex(x => x.title == title);
    if (index == -1) {
        console.log(chalk.red.inverse("Not Found in notes!"));
    } else {
        notes.splice(index, 1);
        saveNotes(notes);
        console.log(chalk.green.inverse("The note with title " + title + " has been removed!"))
    }
}

const addNote = (title, body) => {

    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
            return note.title === title;
        })
        // const duplicateNotes = notes.filter(function(note) {
        //     return note.title === title;
        // })



    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })

        //To convert notes and save it
        saveNotes(notes);
        console.log("New note has been added!");
    } else {
        console.log("Note already exists!");
    }
}

//Take note object and convert it to json file.
const saveNotes = (notes) => {

    const jsonNotes = JSON.stringify(notes);
    Filesystem.writeFileSync("notes.json", jsonNotes);
}

//to get all the notes in the app
const loadNotes = () => {

    try {
        const dataBuffer = Filesystem.readFileSync("notes.json");
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    ListNotes: listNotes,
    ReadNote: readNote
};