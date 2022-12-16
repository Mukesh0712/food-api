import express from 'express';

const app = express();

app.use(express.json());

const db = [{
    id: 1,
    title: 'Chicken',
    price: 210,
    category: 'Dinner'
},
{
    id: 2,
    title: 'Coffee',
    price: 30,
    category: 'Breakfast'
},
{
    id: 3,
    title: 'FishFry',
    price: 80,
    category: 'Lunch'
}
]

app.get('/all-food-items', (req, res) => {
    res.json({
        success: true,
        data: db,
        message: 'All food items fetched successfully'
    })
})

app.post('/add-food-item', (req, res) => {
    const { id, title, price, category } = req.body;

    const newItem = {
        id: id,
        title: title,
        price: price,
        category: category
    }

    db.forEach((item) => {
        if (item.id === id) {
            return res.json({
                success: false,
                data: null,
                message: 'Food Item Already Exists !!'
            })
        }
    })

    db.push(newItem);

    res.json({
        success: true,
        data: newItem,
        message: 'Food Item Added Successfully'
    })
})

app.get('/food-item-by-id', (req, res) => {
    const id = req.query.id

    db.forEach((item) => {
        if (item.id == id) {
            return res.json({
                success: true,
                data: item,
                message: 'Food Item Fetched Successfully'
            })
        }
    })

    res.json({
        success: false,
        data: null,
        message: 'Food Item Not Found'
    })
})

app.get('/delete-food-item-by-id', (req, res) => {
    const id = req.query.id

    db.forEach((item, index) => {
        if (item.id == id) {
            db.splice(index, 1)
            return res.json({
                success: true,
                data: db,
                message: 'Food Item Deleted Successfully'
            })
        }
    })

    res.json({
        success: false,
        data: null,
        message: 'Food Item Not Found !!'
    })
})

app.listen(5000, () => {
    console.log('listening on port 5000');
});