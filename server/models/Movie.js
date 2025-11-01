import { model, Schema } from "mongoose"

const movieSchema = new Schema({
    title: { type: String , required: true , unique: true},
    description: { type: String },
    images: { type: [String] },
    category: { type: String , required: true},
    director: { type: String , required: true},
    year: { type: Number , required: true},
    language: { type: String , required: true },
    rating: { type: Number , default: 0},

},
{
    timestamps:true
})
 const Movie = model("Movie",movieSchema)

 export default Movie;