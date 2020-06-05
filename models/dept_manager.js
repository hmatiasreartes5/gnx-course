const mongoose = require('mongoose');

const Dept_managerSchema = mongoose.Schema({
    empId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'Employee'
    },
    deptId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Department'
    },
    from_date:{
        type: Date()
    },
    to_date:{
        type:Date()
    }
});

module.exports = mongoose.model('Dept_manager', Dept_managerSchema);