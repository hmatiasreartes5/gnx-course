const mongoose = require('mongoose');

const Dept_employeeSchema = mongoose.Schema({
    empId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    deptId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    from_date:{
        type: Date()
    },
    to_date:{
        type: Date()
    }
});

module.exports = mongoose.model('Dept_employee', Dept_employeeSchema);