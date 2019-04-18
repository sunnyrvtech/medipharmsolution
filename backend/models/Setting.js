// Setting.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SettingSchema = new Schema({
    slug: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: Schema.Types.Mixed,
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
const Setting = mongoose.model('settings', SettingSchema);

module.exports = Setting;
