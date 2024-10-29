import { ObjectId } from "mongodb";
import { getdB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository {
    constructor() {
        this.collection = "products";
    }

    async add(newProduct) {
        try {
            const db = getdB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            const db = getdB();
            const collection = db.collection(this.collection);
            return await collection.find().toArray();
        } catch (err) {
            console.log(err);
        }
    }

    async get(id) {
        try {
            const db = getdB();
            const collection = db.collection(this.collection);
            return await collection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.log(err);
        }
    }

    async rateProduct(userID, productID, rating) {
        try {
            const db = getdB();
            const collection = db.collection(this.collection);
            await collection.updateOne(
                { _id: new ObjectId(productID) },
                { $push: { ratings: { userID: new ObjectId(userID), rating } } }
            );
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something wrong in filter api', 500);
        }
    }

    async filter(minPrice, maxPrice, category) {
        try {
            const db = getdB();
            const collection = db.collection(this.collection);
            const filteredExpression = {};

            if (minPrice) {
                filteredExpression.price = { $gte: parseFloat(minPrice) }
            }
            if (maxPrice) {
                filteredExpression.price = { ...filteredExpression.price, $lte: parseFloat(maxPrice) }
            }
            if (category) {
                filteredExpression.category = category;
            }
            console.log(filteredExpression, 'filtered expe');
            console.log(maxPrice, 'max expe');
            console.log(minPrice, 'min expe');
            return await collection.find(filteredExpression).toArray();
        } catch (err) {
            console.log(err);
        }
    }
}

export default ProductRepository;