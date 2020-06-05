const mongoose = require('mongoose');

const SalariesSchema = mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    salary:{
        type: Number,
        required: true
    },
    from_date:{
        type: Date()
    },
    to_date: {
        type: Date()
    }
});

module.exports = mongoose.model('Salary',SalariesSchema);


