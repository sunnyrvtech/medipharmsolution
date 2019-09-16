// StaticPage.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const StaticPageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
StaticPageSchema.plugin(URLSlugs('name', {addField: 'slug'}));
const StaticPage = mongoose.model('static_pages', StaticPageSchema);

module.exports = StaticPage;
