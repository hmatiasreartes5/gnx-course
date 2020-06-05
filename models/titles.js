const mongoose = require('mongoose');

const TitlesSchema = mongoose.Schema({
    empId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Employee'
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    from_date: {
        type: Date()
    },
    to_date:{
        type: Date()
    }
});

module.exports = mongoose.model('Title', TitlesSchema);