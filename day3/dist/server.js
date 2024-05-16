"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                    resolve(value);
                });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken"); // npm i jsonwebtoken
const dotenv = require("dotenv"); // npm i dotenv
dotenv.config();

const fileUpload = require("express-fileupload");
app.use(fileUpload());

// const PDFDocument = require("pdfkit");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const bookController = require("../controllers/BookController");
// const { writeBool } = require("pdfkit/js/data");
app.use("/book", bookController);
app.get("/", (req, res) => {
    res.send("Hello World");
});
// app.get('/hello/:name', (req, res) => {
//     res.send('Hello ' + req.params.name);
// });
app.get("/hi/:name/:age", (req, res) => {
    // res.send('Hi ' + req.params.name + ', you are ' + req.params.age + ' years old');
    res.send(`Hi ${req.params.name}, you are ${req.params.age} years old`);
});
app.post("/hello", (req, res) => {
    res.send(req.body);
});
app.put("/myPut", (req, res) => {
    res.send("PUT request");
});
app.put("/updateCustomer/:id", (req, res) => {
    // const id = req.params.id;
    const id = parseInt(req.params.id);
    const data = req.body;
    // res.send('id = ' + id + ', data = ' + JSON.stringify(data));
    res.send({ id, data });
});
app.delete("/deleteCustomer/:id", (req, res) => {
    res.send("id = " + req.params.id);
});
app.get("/book/list", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const data = yield prisma.book.findMany(); // SELECT * FROM "Book"
        res.send({ data: data });
    })
);
app.post("/book/create", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const result = yield prisma.book.create({
            data: data,
        }); // INSERT INTO "Book" (params) VALUES (...)
        res.send({ result: result });
    })
);
app.post("/book/createManual", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const result = yield prisma.book.create({
            data: {
                isbn: "1004",
                name: "Flutter",
                price: 50,
            },
        }); // INSERT INTO "Book" (params) VALUES (...)
        res.send({ result: result });
    })
);
app.put("/book/update/:id", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.book.update({
                data: {
                    isbn: "10022",
                    name: "test update",
                    price: 900,
                },
                where: {
                    id: parseInt(req.params.id),
                },
            });
            res.send({ message: "Update book success" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.delete("/book/remove/:id", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.book.delete({
                where: {
                    id: parseInt(req.params.id),
                },
            });
            res.send({ message: "Delete book success" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.post("/book/search", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keyword = req.body.keyword;
            const data = yield prisma.book.findMany({
                where: {
                    // OR: [
                    //     { name: { contains: keyword } }, //LIKE %keyword%
                    //     { isbn: { contains: keyword } }
                    // ]
                    name: { contains: keyword },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.post("/book/startsWith", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keyword = req.body.keyword;
            const data = yield prisma.book.findMany({
                where: {
                    name: { startsWith: keyword },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.post("/book/endsWith", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keyword = req.body.keyword;
            const data = yield prisma.book.findMany({
                where: {
                    name: { endsWith: keyword },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/orderBy", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                orderBy: {
                    price: "desc",
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/gt", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                where: {
                    price: {
                        gt: 900,
                    },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/lt", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                where: {
                    price: {
                        lt: 1000,
                    },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/notNull", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                where: {
                    detail: {
                        not: null,
                    },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/isNUll", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                where: {
                    detail: null,
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/between", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                where: {
                    price: {
                        gte: 900, //>= 900
                        lte: 1500, //<= 1500
                    },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/sum", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.aggregate({
                _sum: {
                    price: true,
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/max", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.aggregate({
                _max: {
                    price: true,
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/min", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.aggregate({
                _min: {
                    price: true,
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/average", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.aggregate({
                _avg: {
                    price: true,
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/findYearMonthDay", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                where: {
                    registerDate: new Date("2024-05-08"),
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/findYearMonth", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                where: {
                    registerDate: {
                        gte: new Date("2024-05-01"),
                        lte: new Date("2024-05-31"),
                    },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/book/findYear", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                where: {
                    registerDate: {
                        gte: new Date("2024-01-01"),
                        lte: new Date("2024-12-31"),
                    },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/user/createToken", (req, res) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        const payload = {
            id: 100,
            name: "Bowornthat",
            level: "admin",
        };
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });
        res.send({ token: token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.get("/user/verifyToken", (req, res) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJuYW1lIjoiQm93b3JudGhhdCIsImxldmVsIjoiYWRtaW4iLCJpYXQiOjE3MTU0Mzg4NTIsImV4cCI6MTcxNTQ0MjQ1Mn0.KRqVKR8zJkbWsVl3lUUEZbXD7BVzinKyf49k7glbnaw";
        const decoded = jwt.verify(token, secret);
        res.send({ result: decoded });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
function checkSignIn(req, res, next) {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers["authorization"];
        const result = jwt.verify(token, secret);
        if (result != undefined) {
            next();
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
app.get("/user/info", checkSignIn, (req, res, next) => {
    try {
        res.send({ message: "Welcome to the system" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.get("/oneToOne", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.orderDetail.findMany({
                include: {
                    Book: true,
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/oneToMany", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.book.findMany({
                include: {
                    OrderDetail: true,
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);
app.get("/multiModel", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield prisma.customer.findMany({
                include: {
                    Order: {
                        include: {
                            OrderDetail: true,
                        },
                    },
                },
            });
            res.send({ result: data });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
);

app.post("/book/testUpload", (req, res) => {
    try {
        const myFile = req.files.myFile;
        myFile.mv("./uploads/" + myFile.name, (err) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            res.send({ message: "Upload file success" });
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/readFile", (req, res) => {
    try {
        const fs = require("fs");
        fs.readFile("test.txt", "utf8", (err, data) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            res.send({ result: data });
        });
        // res.send({ result: data });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/writeFIle", (req, res) => {
    try {
        const fs = require("fs");
        fs.writeFile("test.txt", "New Hello world", (err) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            res.send({ message: "Write file success" });
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/removeFile", (req, res) => {
    try {
        const fs = require("fs");
        fs.unlink("test.txt", (err) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            res.send({ message: "Remove file success" });
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/fileExists", (req, res) => {
    try {
        const fs = require("fs");
        const found = fs.existsSync("test.txt");
        res.send({ result: found });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/createPdf", (req, res) => {
    const PDFDocument = require("pdfkit");
    const fs = require("fs");
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("output.pdf"));
    doc.font('Sarabun/Sarabun-Bold.ttf').fontSize(25).text("สวัสดีครับ", 100, 100);
    doc.addPage().fontSize(25).text("New page", 100, 100);
    doc.end();

    res.send({ message: "Create pdf success" });
});

app.get('/readExcel', async (req, res) => {
    try {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        await workbook.xlsx.readFile('productExport.xlsx');
        const workSheet = workbook.getWorksheet(1);

        for (let i = 1; i <= workSheet.rowCount; i++) {
            const row = workSheet.getRow(i);
            // console.log(row.getCell(1).value);
            const barcode = row.getCell(1).value;
            const name = row.getCell(2).value;
            const cost = row.getCell(3).value;
            const sale = row.getCell(4).value;
            const send = row.getCell(5).value;
            const unit = row.getCell(6).value;
            const point = row.getCell(7).value;
            const productTypeId = row.getCell(8).value;

            console.log(barcode, name, cost, sale, send, unit, point, productTypeId);
        }
        res.send({ message: 'Read excel success' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.delete('/orderDetail/remove/:id', async (req, res) => {
    try {
        await prisma.orderDetail.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.send({ message: 'Delete order detail success' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});
