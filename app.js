import express from "express";
import mongoose, { mongo } from "mongoose";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://demo:demo@cluster0.6hpdf.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("db is connect")
}).catch((err) => {
    console.log("error is occur", err)
})

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    authorName: {
        type: String,
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    qty: {
        type: Number
    },
    image: {
        type: String
    }
})
const Book = mongoose.model('Book', bookSchema);

app.post('/createBook', async (req, res) => {
    const { name, authorName, price, description, qty } = req.body;
    console.log(name , authorName);
    try {
        const book = new Book(req.body);
        console.log(book)
        await book.save();
        return res.status(200).json({ message: "book is created succesfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

app.get('getBook', async (req, res) => {
    try {
        const books = await Book.findAll();
        return res.status(200).json({ books: books })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })

    }
})

app.delete('/deleteBook/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const books = await Book.findByIdAndDelete(id);
        return res.status(200).json({ message: "book is deleted successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })

    }
})
app.put('/update', async (req, res) => {
    const { id, qty } = req.body;

    try {
        const updateBook = await Book.findByIdAndUpdate(id, { $set: { qty: qty } });
        return res.status(201).json({ message: "book is updated successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })

    }
})

app.listen(5000, () => {
    console.log("server is running")
})